const pool = require('../db');

const CollectionModel = {
  async getAll() {
    const result = await pool.query('SELECT * FROM collection ORDER BY id');
    return result.rows;
  },
  async getAllCollectionsMocks(userId) {
    const result = await pool.query(`
      SELECT 
        c.id AS collection_id,
        c.name AS collection_name,
        m.*
      FROM collection c
      LEFT JOIN collection_mock cm ON cm.collection_id = c.id
      LEFT JOIN mock m ON m.id = cm.mock_id
      WHERE c.user_id = $1
      ORDER BY c.id, m.id
    `, [userId]);

    const grouped = result.rows.reduce((acc, row) => {
      const { collection_id, collection_name, ...mockData } = row;

      if (!acc[collection_id]) {
        acc[collection_id] = {
          id: collection_id,
          name: collection_name,
          mocks: [],
        };
      }

      if (mockData.id) {
        acc[collection_id].mocks.push(mockData);
      }

      return acc;
    }, {});

    return Object.values(grouped);
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM collection WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(data, userId) {
    const result = await pool.query(
      'INSERT INTO collection (name, user_id) VALUES ($1, $2) RETURNING *',
      [data.name, userId]
    );
    return result.rows[0];
  },  

  async update(id, data) {
    const result = await pool.query(
      'UPDATE collection SET name = $1, updated_on = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [data.name, id]
    );
    return result.rows[0];
  },

  async remove(id) {
    const result = await pool.query('DELETE FROM collection WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
  async getAllByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM collection WHERE user_id = $1 ORDER BY created_on DESC',
      [userId]
    );
    return result.rows;
  }

};

module.exports = CollectionModel;