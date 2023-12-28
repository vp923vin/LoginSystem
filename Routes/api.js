const express = require('express');
const router = express.Router();

// api routes here
router.get('/resource', (req, res) => {
    return res.json({ message: 'API resource' });
});

module.exports = router;
