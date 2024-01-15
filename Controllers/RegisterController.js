const User = require('../Models/UsersModel');
const { transporter, sendRegistrationMail} = require('../Config/Email');
const path = require('path');
const ejs = require('ejs');
const registerPage = (req, res) => {
    return res.render('pages/register');
};
const userRegistration = async (req, res) =>{
    const { fullName, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email: email});
        if (existingUser) {
            return res.render('pages/register', { error: "user already registerd"});
        }
        const newUser = new User({fullName, email, password });
        const newUserStauts = await newUser.save();
        if(newUserStauts){
            const registerTemplatePath =  path.resolve(process.cwd(), 'Views', 'emails', `RegisterEmail.ejs`);
            const registerHtml = await ejs.renderFile(registerTemplatePath, newUserStauts);
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: newUserStauts.email,
                subject: 'Registration Successfully',
                html: registerHtml,
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.redirect('/login');
        }

    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    registerPage, 
    userRegistration,
}