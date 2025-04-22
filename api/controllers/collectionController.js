const CollectionService = require('../services/collectionService');

const getAllCollections = async (req, res) => {
  try {
    const collections = await CollectionService.listCollections();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching collections', error: err.message });
  }
};
const getAllCollectionsWithMocks = async (req, res) => {
  try {
    const collections = await CollectionService.listCollectionsWithMocks();
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
  const collectionData = req.body;
  if (!collectionData.name || collectionData.name.trim() === '') {
    return res.status(400).json({ message: 'Collection name is required and cannot be empty' });
  }

  try {
    const created = await CollectionService.createCollection(collectionData);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error creating collection', error: err.message });
  }
};

const updateCollection = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updated = await CollectionService.updateCollection(id, updatedData);
    if (!updated) return res.status(404).json({ message: 'Collection not found' });
    res.json(updated);
  } catch (err) {
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
