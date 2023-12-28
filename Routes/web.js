const express = require('express');
const router = express.Router();
const {  webController } = require('../Controllers/LoginController');
// web routes here
router.get('/', (req, res) => {
    return res.send('Hello, web!');
});

router.get('/login', webController);

module.exports = router;
