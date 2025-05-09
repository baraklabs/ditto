const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@ditto_db:5432/ditto',
  ssl: false,
});

module.exports = pool; 
