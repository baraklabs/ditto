const MockModel = require('../models/mockModel');
const CollectionMockModel = require('../models/collectionMockModel');

const MockService = {
  listMocks: () => MockModel.getAll(),
  getMockById: (id) => MockModel.getById(id),
  createMock: async (data) => {
    // Step 1: Create the Mock
    const createdMock = await MockModel.create(data);
    // Step 2: Link Mock to Collection in collection_mock table
    if (data.collectionId) {
      await CollectionMockModel.create( data.collectionId, createdMock.id );
    }

    return createdMock;
  },  updateMock: (id, data) => MockModel.update(id, data),
  deleteMock: (id) => MockModel.remove(id)
};

module.exports = MockService;
