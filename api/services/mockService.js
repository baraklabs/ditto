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
  }, updateMock: (id, data) => MockModel.update(id, data),
  deleteMock: (id) => MockModel.remove(id)
};

module.exports = MockService;
