const express = require('express');
const router = express.Router();
const { apiController } = require('../Controllers/Api/ApiController');
// api routes here
router.get('/resource', (req, res) => {
    return res.json({ message: 'API resource' });
});

router.get('/test', apiController);
module.exports = router;
