CREATE TABLE IF NOT EXISTS request_response (
  id SERIAL PRIMARY KEY,
  request TEXT NOT NULL,  -- Store request data
  response TEXT NOT NULL,  -- Store response data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
