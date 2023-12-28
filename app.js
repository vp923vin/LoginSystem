const  Express = require('express');
const path = require('path');
require('dotenv').config();
const app = Express();

const MongoConnect = require('./Config/mongoDB');
const MysqlConnect = require('./Config/sqlDB');
const configRoutes = require('./Config/Routes');
const { generateToken, verifyToken } = require('./Config/JWT');

const mailConfig = require('./Config/Email');
const PORT = process.env.PORT || 3000;
// set paths
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// use any one as database
MongoConnect();
MysqlConnect();

// config routes
configRoutes(app);

// Serve static files from the Public directory
app.use(Express.static('Public'));


// Test JWT functionality
const user = { id: 1, username: 'test_user' };
const token = generateToken(user);
console.log('Generated JWT for testing:', token);
const decodedUser = verifyToken(token);
if (decodedUser) {
    console.log('Decoded user from JWT:', decodedUser);
}

// testing email functionality
app.get('/send-custom-email', async (req, res) => {
    const userEmail = 'vipinp923@gmail.com';
    const emailSubject = 'Vipin patel';
    const templateName = 'customTemplate';  // Name of the template file without the extension
    const templateData = { username: 'Vipin Patel' };

    await mailConfig.sendMail(userEmail, emailSubject, templateName, templateData);

    res.send('Email sent successfully!');
});


app.listen(PORT, (req, res) => {
    console.log('listening on', PORT)
});