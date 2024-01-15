const express = require('express');
const router = express.Router();
const {  LoginPage, loginUser , userDashboard, logOutUser } = require('../Controllers/LoginController');
const {  registerPage, userRegistration } = require('../Controllers/RegisterController');
// web routes here
router.get('/', (req, res) => {
    return res.send('Hello, web!');
});

router.get('/register', registerPage);
router.get('/login', LoginPage);
router.post('/register', userRegistration);
router.post('/login', loginUser);
router.get('/dashboard', userDashboard);
router.get('/logout', logOutUser);

// Errors Routes 4XX
router.get('/400', (req, res) => {
    return res.render('errors/4XX', {
        error_code: 400, 
        page_title: '400 - Bad Request', 
        error_message: 'Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax).'
    });
});
router.get('/401', (req, res) => {
    return res.render('errors/4XX', {
        error_code: 401, 
        page_title: '401 - Unauthorized', 
        error_message: 'Unauthorized - The request requires user authentication.'
    });
});
router.get('/403', (req, res) => {
    return res.render('errors/4XX', {
        error_code: 403, 
        page_title: '403 - Forbidden', 
        error_message: 'Forbidden, Not Allowed to View.'
    });
});
router.get('/404', (req, res) => {
    return res.render('errors/4XX', {
        error_code: 404, 
        page_title: '404 - Not Found', 
        error_message: 'Not Found - The requested resource could not be found on the server.'
    });
});

// Error Routes 5XX 
router.get('/500', (req, res) => {
    return res.render('errors/5XX', {
        error_code: 500,
        page_title: '500 - Internal Server Error',
        error_message: 'Internal Serever Error - An unexpected condition prevented the server from fulfilling the request.'
    });
});
router.get('/502', (req, res) => {
    return res.render('errors/5XX', {
        error_code: 502,
        page_title: '502 - Bad Gateway',
        error_message: 'Bad Gateway'
    });
});
router.get('/503', (req, res) => {
    return res.render('errors/5XX', {
        error_code: 503,
        page_title: '503 - Service Unavailable',
        error_message: 'Service Unavailable'
    });
});
router.get('/504', (req, res) => {
    return res.render('errors/5XX', {
        error_code: 504,
        page_title: '504 -  Gateway Timeout',
        error_message: 'Gateway Timeout' 
    });
});

router.get('/test-route', (req, res) => { 
    return res.render('pages/includes/main', {content : '../home.ejs', page_title : 'Home' });
});

module.exports = router;
