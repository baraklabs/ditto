const express = require('express');
const router = express.Router();
const MockController = require('../controllers/mockController');

router.get('/', MockController.getAllMocks);

router.get('/:id', MockController.getMockById);

router.post('/', MockController.createMock);

router.put('/:id', MockController.updateMock);

router.delete('/:id', MockController.deleteMock);

module.exports = router;
