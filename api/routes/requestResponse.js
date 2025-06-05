const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestResponseController');
const authenticateToken = require('../middlewares/authenticateToken');

// GET all
router.get('/', authenticateToken, controller.listAll);

module.exports = router;