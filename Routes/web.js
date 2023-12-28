const express = require('express');
const router = express.Router();

// web routes here
router.get('/', (req, res) => {
    return res.send('Hello, web!');
});





module.exports = router;
