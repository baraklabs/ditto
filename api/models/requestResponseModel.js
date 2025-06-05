const pool = require('../db');

const RequestResponseModel = {
  // Insert a new request-response record
  create: async (data) => {
    const {
      req_path_param,
      req_method,
      req_header,
      req_body,
      req_query_param,
      res_status,
      res_header,
      res_body,
      cookies,
      host,
      user_id,
      mock_id
    } = data;

    const query = `
      INSERT INTO request_response (
        req_path_param, req_method, req_header, req_body, req_query_param,
        res_status, res_header, res_body, cookies,host, user_id, mock_id
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10, $11, $12
      )
      RETURNING *
    `;

    const values = [
      req_path_param,
      req_method,
      req_header,
      req_body,
      req_query_param,
      res_status,
      res_header,
      res_body,
      cookies,
      host,
      user_id,
      mock_id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getByUserIdAndDay: async (userId, startTime, endTime, offset = 0, limit = 10) => {
    const query = `
    SELECT
      id,
      req_method,
      req_path_param,
      req_query_param,
      req_body,
      res_status,
      res_body,
      host,
      created_at,
      mock_id
    FROM request_response
    WHERE user_id = $1
      AND created_at BETWEEN $2 AND $3
    ORDER BY created_at DESC
    OFFSET $4
    LIMIT $5
  `;

    const values = [userId, startTime, endTime, offset, limit];
    const result = await pool.query(query, values);
    return result.rows;
  }

};

module.exports = RequestResponseModel;
