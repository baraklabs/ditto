CREATE TABLE IF NOT EXISTS collection (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) DEFAULT 'Default',
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mock (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) ,
  req_path_param TEXT Default '/',
  req_method VARCHAR(10)  DEFAULT 'GET',
  req_header text,
  req_body TEXT,
  req_query_param text,
  res_status INTEGER DEFAULT 200,
  res_header text,
  res_body TEXT,
  res_delay_ms INTEGER DEFAULT 0,
  cookies text,
  mock_type VARCHAR(50),  -- e.g., STATIC, PROXY, DYNAMIC
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
