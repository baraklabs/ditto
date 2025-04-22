const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'sql');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const { rows: executed } = await pool.query('SELECT filename FROM migrations');
  const executedFiles = executed.map(row => row.filename);

  for (const file of files) {
    if (executedFiles.includes(file)) {
      console.log(`✅ Skipping already executed: ${file}`);
      continue;
    }

    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    try {
      await pool.query(sql);
      await pool.query('INSERT INTO migrations (filename) VALUES ($1)', [file]);
      console.log(`🔁 Executed: ${file}`);
    } catch (err) {
      console.error(`❌ Error executing ${file}:`, err.message);
      process.exit(1); // stop on error
    }
  }

  console.log('🚀 Migrations complete');
  process.exit(0);
}

runMigrations();
