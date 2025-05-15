const pool = require('../db');

const MockModel = {
  async getAll(userId) {
    const result = await pool.query(
      'SELECT * FROM mock WHERE user_id = $1 ORDER BY id',
      [userId]
    );
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM mock WHERE id = $1', [id]);
    return result.rows[0];
  },
 async create(data, userId) {
  const result = await pool.query(
    `INSERT INTO mock (
      name, 
      req_path_param, 
      req_method, 
      req_header, 
      req_body, 
      req_query_params, 
      res_status, 
      res_header, 
      res_body, 
      res_delay_ms, 
      cookies, 
      mock_type, 
      priority,
      user_id,
      host,
      port,
      schema
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
    ) RETURNING *`,
    [
      data?.name ?? null,
      data?.pathParam ?? null,
      data?.method ?? 'GET',
      data?.requestHeader ?? null,
      data?.requestBody ?? null,
      data?.requestQueryParam ?? null,
      Number.isInteger(+data?.responseStatus) ? +data.responseStatus : null,
      data?.responseHeader ?? null,
      data?.responseBody ?? null,
      Number.isInteger(+data?.responseDelayMs) ? +data.responseDelayMs : null,
      data?.cookies ?? null,
      data?.mockType ?? null,
      Number.isInteger(+data?.priority) ? +data.priority : null,
      userId,
      data?.host ?? null,
      Number.isInteger(+data?.port) ? +data.port : null,
      data?.schema ?? null
    ]
  );
  return result.rows[0];
}

  ,
  async update(id, data) {
    const result = await pool.query(
      `UPDATE mock SET
        name = $1,
        req_path_param = $2,
        req_method = $3,
        req_header = $4,
        req_body = $5,
        req_query_params = $6,
        res_status = $7,
        res_header = $8,
        res_body = $9,
        res_delay_ms = $10,
        cookies = $11,
        mock_type = $12,
        priority = $13,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $14
      RETURNING *`,
      [
        data.name,
        data.req_path_param || null,
        data.req_method || 'GET',
        data.req_header || null,
        data.req_body || null,
        data.req_query_params || null,
        Number.isInteger(data.res_status) ? data.res_status : null,
        data.res_header || null,
        data.res_body || null,
        Number.isInteger(data.res_delay_ms) ? data.res_delay_ms : null,
        data.cookies || null,
        data.mock_type || null,
        Number.isInteger(data.priority) ? data.priority : null,
        id
      ]
    );

    return result.rows[0];
  }
  ,

  async remove(id) {
    const result = await pool.query('DELETE FROM mock WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
  ,
  async getMocks(req_method) {

    const query = 'SELECT * FROM mock WHERE req_method = $1';

    const values = [
      req_method
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }

};

module.exports = MockModel;
