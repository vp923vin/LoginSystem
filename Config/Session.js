const session = require('express-session');
const sessionConfig = {
    secret:  process.env.SESSION_SECRET_KEY || 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: false,
}

module.exports = sessionConfig;