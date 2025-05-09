const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const pool = require('./db');

// Load .env from one level up
dotenv.config({ path: path.join(__dirname, '..', '.env') });

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
      process.exit(1);
    }
  }

  console.log('🚀 Migrations complete');
}

async function setupAdminUser() {
  const email = process.env.ADMIN_USER_EMAIL_ID;
  const password = process.env.ADMIN_PASSWORD;
  const allowUpdate = process.env.ALLOW_ADMIN_PASSWORD_UPDATE === 'true';

  if (!email || !password || typeof allowUpdate === 'undefined') {
    console.log('ℹ️  Skipping admin setup. Required env variables are not all set.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('SELECT id FROM users WHERE email_id = $1', [email]);

    if (result.rowCount === 0) {
      await pool.query(`
        INSERT INTO users (email_id, password_hash, active)
        VALUES ($1, $2, true)`,
        [email, hashedPassword]
      );
      console.log(`✅ Admin user created: ${email}`);
    } else if (allowUpdate) {
      await pool.query(`
        UPDATE users
        SET password_hash = $2
        WHERE email_id = $1`,
        [email, hashedPassword]
      );
      console.log(`🔁 Admin password updated: ${email}`);
    } else {
      console.log(`ℹ️  Admin user exists and password update is not allowed: ${email}`);
    }
  } catch (err) {
    console.error(`❌ Failed to setup admin user:`, err.message);
    process.exit(1);
  }
}

(async () => {
  await runMigrations();
  await setupAdminUser();
  process.exit(0);
})();
