const CollectionModel = require('../models/collectionModel');
const CollectionMockModel = require('../models/collectionMockModel');
const MockModel = require('../models/mockModel');

function parseText(val) {
  return val
  if (!val || val == "") return null;
  try {
    return JSON.parse(val);
  } catch {
    return val; // fallback to raw string if not JSON
  }
}
const CollectionService = {
  listCollections: () => CollectionModel.getAll(),
  listCollectionsByUserId: (userId) => CollectionModel.getAllByUserId(userId),
  listCollectionsWithMocks: async (userId) => {
    const allCollections = await CollectionModel.getAllCollectionsMocks(userId);
    const transformed = allCollections.map(collection => {
      const transformedMocks = collection.mocks.map(mock => ({
        id: mock.id,
        name: mock.name,
        req_path_param: mock.req_path_param,
        req_method: mock.req_method,
        req_header: parseText(mock.req_header),
        req_body: parseText(mock.req_body),
        req_query_param: parseText(mock.req_query_param),
        res_status: mock.res_status,
        res_header: parseText(mock.res_header),
        res_body: parseText(mock.res_body),
        res_delay_ms: mock.res_delay_ms,
        cookies: parseText(mock.cookies),
        mock_type: mock.mock_type,
        priority: mock.priority,
        created_at: mock.created_at,
        updated_at: mock.updated_at,
        host: mock.host,
        schema: mock.schema,
        port: mock.port
      }));

      return {
        id: collection.id,
        name: collection.name,
        mocks: transformedMocks
      };
    });

    return transformed;
  }
  ,
  getCollectionById: (id) => CollectionModel.getById(id),
  createCollection: (data, userId) => CollectionModel.create(data, userId),
  updateCollection: (id, data, userId) => {
    return CollectionModel.update(id, data, userId);
  },
  deleteCollection: async (id, userId) => {
    // 1. Get the collection and validate ownership
    const collection = await CollectionModel.getById(id);
    if (!collection || collection.user_id !== userId) {
      throw new Error('Collection not found or not authorized to delete');
    }

    // 2. Get all mappings for the collection
    const mappings = await CollectionMockModel.getByCollectionId(id);

    // 3. Delete each mock (only if user owns it)
    const mockIds = mappings.map(m => m.mock_id);

    // Bulk delete mocks if user owns them
    if (mockIds.length) {
      await MockModel.removeManyByIds(mockIds, userId);
    }
    // 4. Delete all collection_mock mappings
    await CollectionMockModel.removeByCollectionId(id);

    // 5. Delete the collection
    return CollectionModel.remove(id)
  },
};

module.exports = CollectionService;