const { Pool } = require('pg');

let ssl;
try {
  ssl = process.env.SSL ? JSON.parse(process.env.SSL) : false;
} catch (err) {
  console.warn('Invalid SSL config in .env, falling back to false');
  ssl = false;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@ditto_db:5432/ditto',
  ssl,
});
module.exports = pool; 
