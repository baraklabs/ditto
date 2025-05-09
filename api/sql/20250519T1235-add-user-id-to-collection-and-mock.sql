CREATE TABLE IF NOT EXISTS  users (
    id SERIAL PRIMARY KEY,  -- or AUTO_INCREMENT if using MySQL
    email_id VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT ,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    active boolean default false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uuid UUID
);

ALTER TABLE collection
ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

-- Add user_id column to mock table
ALTER TABLE mock
ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

