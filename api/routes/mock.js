const express = require('express');
const router = express.Router();
const MockController = require('../controllers/mockController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', authenticateToken, MockController.getAllMocks);

router.get('/:id', authenticateToken, MockController.getMockById);

router.post('/', authenticateToken, MockController.createMock);

router.put('/:id', authenticateToken, MockController.updateMock);

router.delete('/:id', authenticateToken, MockController.deleteMock);

module.exports = router;
