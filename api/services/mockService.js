const MockModel = require('../models/mockModel');
const CollectionMockModel = require('../models/collectionMockModel');
const CollectionModel = require('../models/collectionModel');

const MockService = {
  listMocks: (userId) => MockModel.getAll(userId),
  getMockById: (id) => MockModel.getById(id),
  createMock: async (data, userId) => {
    const createdMock = await MockModel.create(data, userId);
    let collectionId;
    if (!data.collectionId || data.collectionId == 'default') {
      let newCollection = await CollectionModel.create({ "name": data.collectionId }, userId);
      collectionId = newCollection.id
    }
    else {
      collectionId = data.collectionId;
    }
    await CollectionMockModel.create(collectionId, createdMock.id);

    return createdMock;
  },
  updateMock: async (id, data, userId) => {

    try {

      // Step 1: Update mock fields
      const updatedMock = await MockModel.update(id, data, userId);
      if (!updatedMock) throw new Error('Mock not found or unauthorized');

      // Step 2: Update mapping only if a new collection is specified
      if (data.collectionId) {
        await CollectionMockModel.updateCollectionMock(id, data.collectionId);
      }

      return updatedMock;
    } catch (err) {
      console.error("Error updating collection mock"+err);
      throw err;
    }
  }
  ,
  deleteMock: (id) => MockModel.remove(id)
};

module.exports = MockService;
