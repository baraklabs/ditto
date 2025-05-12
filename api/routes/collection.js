const express = require('express');
const collectionController = require('../controllers/collectionController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();


router.get('/', authenticateToken, collectionController.getAllCollections);
router.get('/mock', authenticateToken, collectionController.getAllCollectionsWithMocks);
router.get('/:id', authenticateToken, collectionController.getCollectionById);
router.post('/', authenticateToken, collectionController.createCollection);
router.put('/:id', authenticateToken, collectionController.updateCollection);
router.delete('/:id', authenticateToken, collectionController.deleteCollection);

module.exports = router;