const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});
console.log("gpass", process.env.GMAIL_PASSWORD)
const sendMail = async (to, subject, templateName, templateData) => {
    
    const templatePath = path.resolve(process.cwd(), 'Views', 'emails', `${templateName}.ejs`);
// console.log(templatePath)
    try {
        require.resolve(templatePath);
    } catch (err) {
        console.warn(`Template not found for "${templateName}", using default template.`);
        return sendMail(to, subject, 'emailTemplate', templateData);
    }

    const html = await ejs.renderFile(templatePath, templateData);
    // console.log(html)
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html,
    };
    try {
        // console.log(mailOptions)
        const info = await transporter.sendMail(mailOptions);
       
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = {
    sendMail,
};
