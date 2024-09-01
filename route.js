const express = require('express');
const router = express.Router();
const { getAllData } = require('./controller.js');

router.get('/', (req, res) => {
    res.json(getAllData()); // Return JSON response
});

module.exports = router;
