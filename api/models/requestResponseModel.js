const pool = require('../db');

const RequestResponseModel = {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM request_response ORDER BY id'
    );
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM request_response WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async create(data) {
    const result = await pool.query(
      `INSERT INTO request_response (request, response) VALUES ($1, $2) RETURNING *`,
      [data.request, data.response]
    );
    return result.rows[0];
  },


  async remove(id) {
    const result = await pool.query(
      'DELETE FROM request_response WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = RequestResponseModel;