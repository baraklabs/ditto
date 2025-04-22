const express = require('express');
const collectionController = require('../controllers/collectionController');

const router = express.Router();


router.get('/', collectionController.getAllCollections);
router.get('/mock', collectionController.getAllCollectionsWithMocks);
router.get('/:id', collectionController.getCollectionById);
router.post('/', collectionController.createCollection);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;