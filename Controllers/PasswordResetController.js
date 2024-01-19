const ForgetPassword = require('../Models/ForgetPasswordModel');
const User = require('../Models/UsersModel');
const { transporter, sendRegistrationMail} = require('../Config/Email');
const path = require('path');
const ejs = require('ejs');
const bcrypt = require('bcrypt');

const generateRandomToken = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
};

const forgertPassword = (req, res) => {
    return res.render('pages/forget-password', { message: ''});
};

const sendResetPasswordLink = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.render('pages/forget-password', { message: 'User not found' });
        const token = generateRandomToken(100);
        const forgetPasswordEntry = new ForgetPassword({
            email,
            token,
        });
        const dataSaved = await forgetPasswordEntry.save();
        if(dataSaved) {
            const forgetPasswordTemplatePath =  path.resolve(process.cwd(), 'Views', 'emails', `ForgetPassword.ejs`);
            const passwordResetLink = `http://localhost:4000/reset-password?token=${token}`;
            const forgetPasswordHtml = await ejs.renderFile(forgetPasswordTemplatePath, {passwordResetLink});
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: email,
                subject: 'Reset Password Link',
                html: forgetPasswordHtml
            };
            req.session.token = token;
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.render('pages/login', {message: "Password Reset link send in your mail box, check your inbox."});
        }

    } catch (error) {
        console.error(error);
    }
    
};

const resetPassword = (req, res) => {
    const token = req.query.token;
    return res.render('pages/reset-password', {message: "", token: token});
};
const updateUserPassword = async (req, res) => {
    const { new_password, confirm_password, token } = req.body;

    try {
        const forgetPasswordEntry = await ForgetPassword.findOne({ token });

        if (!forgetPasswordEntry) {
            console.log("Failed to find forget password entry");
            return res.redirect('/login');
        }
        const userEmail = forgetPasswordEntry.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) { console.log("test"); return res.redirect('/login')};
        
        if (new_password !== confirm_password) {  return res.redirect('/login')};
        user.password = new_password;
        await user.save();
        await ForgetPassword.deleteOne({ token });
        return res.render('pages/login', { message: 'Password updated successfully. You can now login with your new password.' });

    } catch (error) {
        console.error(error)
    }
};

module.exports = {  
    forgertPassword, 
    sendResetPasswordLink, 
    resetPassword, 
    updateUserPassword
};