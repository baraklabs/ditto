const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestResponseController');

// GET all
router.get('/', controller.listAll);

// GET by ID
router.get('/:id', controller.getById);

// POST new
router.post('/', controller.create);

// PUT update
router.put('/:id', controller.update);

// DELETE
router.delete('/:id', controller.remove);

module.exports = router;