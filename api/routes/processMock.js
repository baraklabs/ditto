const express = require('express');
const router = express.Router();
const ProcessMockController = require('../controllers/processMockController');

// Route that accepts any HTTP method
router.all('/', ProcessMockController.generate);

module.exports = router;
