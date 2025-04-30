const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/mockdb',
  ssl: {
    rejectUnauthorized: false,  // Accepts self-signed certs or disables certificate validation
  },
});

module.exports = pool; 
