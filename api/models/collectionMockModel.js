// models/collectionMockModel.js
const pool = require('../db');

const CollectionMockModel = {
  /**
   * Get all collection-mock mappings
   */
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM collection_mock ORDER BY id'
    );
    return result.rows;
  },

  /**
   * Get a specific mapping by its ID
   */
  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM collection_mock WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  /**
   * Get all mappings for a given collection
   */
  async getByCollectionId(collectionId) {
    const result = await pool.query(
      'SELECT * FROM collection_mock WHERE collection_id = $1 ORDER BY id',
      [collectionId]
    );
    return result.rows;
  },

  /**
   * Get all mappings for a given mock
   */
  async getByMockId(mockId) {
    const result = await pool.query(
      'SELECT * FROM collection_mock WHERE mock_id = $1 ORDER BY id',
      [mockId]
    );
    return result.rows;
  },

  /**
   * Create a new mapping between a collection and a mock
   */
  async create(collectionId, mockId) {
    const colId = parseInt(collectionId)
    const mId = parseInt(mockId);

    if (colId === null || mId === null) {
      throw new Error('Invalid collectionId or mockId. Both must be integers.');
    }
  
    const result = await pool.query(
      `INSERT INTO collection_mock (collection_id, mock_id) VALUES ($1, $2) RETURNING *`,
      [colId, mId]
    );
  
    return result.rows[0];
  }
  ,
  /**
   * Remove a mapping by its ID
   */
  async remove(id) {
    const result = await pool.query(
      'DELETE FROM collection_mock WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = CollectionMockModel;
