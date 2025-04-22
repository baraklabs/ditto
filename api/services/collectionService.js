const CollectionModel = require('../models/collectionModel');

function parseText(val) {
  return val
  if (!val || val=="") return null;
  try {
    return JSON.parse(val);
  } catch {
    return val; // fallback to raw string if not JSON
  }
}
const CollectionService = {
  listCollections: () => CollectionModel.getAll(),
  listCollectionsWithMocks: async () => {
    const allCollections = await CollectionModel.getAllCollectionsMocks();
    const transformed = allCollections.map(collection => {
      const transformedMocks = collection.mocks.map(mock => ({
        id: mock.id,
        name: mock.name,
        req_path_param: mock.req_path_param,
        req_method: mock.req_method,
        req_header: parseText(mock.req_header),
        req_body: parseText(mock.req_body),
        req_query_params: parseText(mock.req_query_params),
        res_status: mock.res_status,
        res_header: parseText(mock.res_header),
        res_body: parseText(mock.res_body),
        res_delay_ms: mock.res_delay_ms,
        cookies: parseText(mock.cookies),
        mock_type: mock.mock_type,
        priority: mock.priority,
        created_at: mock.created_at,
        updated_at: mock.updated_at
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
  createCollection: (data) => CollectionModel.create(data),
  updateCollection: (id, data) => CollectionModel.update(id, data),
  deleteCollection: (id) => CollectionModel.remove(id)
};

module.exports = CollectionService;