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

const sendRegistrationMail = async () => {};

module.exports = {
    transporter,
    sendRegistrationMail,
};
