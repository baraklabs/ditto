const pool = require('../db');

// 1. Find User by Email
exports.findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email_id = $1', [email]);
  return result.rows[0];  // Returns the first user with that email
};


exports.create = async ({ email_id, password_hash, first_name, last_name }) => {
  const result = await pool.query(
    `INSERT INTO users (email_id, password_hash, first_name, last_name, active)
     VALUES ($1, $2, $3, $4, true)
     RETURNING id, email_id, first_name, last_name, active`,
    [email_id, password_hash, first_name, last_name]
  );
  return result.rows[0];
};
exports.getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, email_id, first_name, last_name, active
     FROM users
     ORDER BY created_at DESC`
  );
  return result.rows;
};
exports.getUserProfile = async (userId) => {
  const result = await pool.query('SELECT id, first_name, last_name, email_id, active FROM users WHERE id = $1', [userId]);
  return result.rows[0];  // Returns the user profile excluding sensitive data
};
