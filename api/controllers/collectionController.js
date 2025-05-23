const CollectionService = require('../services/collectionService');

const getAllCollections = async (req, res) => {
  let userId = req.user.userId
  try {
    const collections = await CollectionService.listCollectionsByUserId(userId);
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching collections', error: err.message });
  }
};
const getAllCollectionsWithMocks = async (req, res) => {
  try {
    let userId = req.user.userId

    const collections = await CollectionService.listCollectionsWithMocks(userId);
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching collections', error: err.message });
  }
};

const getCollectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await CollectionService.getCollectionById(id);
    if (!collection) return res.status(404).json({ message: 'Collection not found' });
    res.json(collection);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching collection', error: err.message });
  }
};

const createCollection = async (req, res) => {
  let userId = req.user.userId

  const collectionData = req.body;
  if (!collectionData.name || collectionData.name.trim() === '') {
    return res.status(400).json({ message: 'Collection name is required and cannot be empty' });
  }

  try {
    const created = await CollectionService.createCollection(collectionData, userId);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error creating collection', error: err.message });
  }
};

const updateCollection = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const userId = req.user?.userId; // assuming `req.user` is set from auth middleware

  if (!id || !userId) {
    return res.status(400).json({ message: 'Missing collection ID or user ID' });
  }

  try {
    const updated = await CollectionService.updateCollection(id, updatedData, userId);
    if (!updated) return res.status(404).json({ message: 'Collection not found or access denied' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating collection', error: err.message });
  }
};


const deleteCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await CollectionService.deleteCollection(id);
    if (!deleted) return res.status(404).json({ message: 'Collection not found' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting collection', error: err.message });
  }
};

module.exports = {
  getAllCollections,
  getAllCollectionsWithMocks,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection
};
