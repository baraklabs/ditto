CREATE TABLE IF NOT EXISTS request_response (
  id SERIAL PRIMARY KEY,
  req_path_param TEXT,
  req_method VARCHAR(10),
  req_header text,
  req_body TEXT,
  req_query_param text,
  res_status INTEGER,
  res_header text,
  res_body TEXT,
  cookies text,
  host VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  mock_id INTEGER REFERENCES mock(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);