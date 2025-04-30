const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 'ok' , version : "v0.1.0-beta" }));

module.exports = router;
