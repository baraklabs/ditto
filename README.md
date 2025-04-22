# Ditto

Ditto is a lightweight mock API server, simulate dynamic responses. It supports:

- Creating mock endpoints with custom request/response behavior
- Viewing and logging incoming requests
- Organizing mocks by collections


## 🧩 Tech Stack

- **Frontend**: React (TailwindCSS, Vite or CRA)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

---

## ⚙️ Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ▶️ How to Start the Server

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/ditto.git
cd ditto
### ✅ 2. Build & Start Docker Compose

```bash
docker-compose up --build
```

This will:

1. Pull the `postgres` image
2. Build your Node.js app image
3. Start the database and wait for it
4. Run migrations using `runMigrations.js`
5. Start your Express app on port `3001`

---

### ✅ 3. Verify

Once up:

- Check logs:
  ```bash
  docker-compose logs -f
  ```

- Health check:
  ```bash
  curl http://localhost:3001/api/health
  ```

If successful, you'll see:
```json
{ "status": "ok" }
```

---

## 🔧 APIs Available

### Health Check
`GET /api/health`

### Collections
- `GET /api/collections`
- `GET /api/collections/:id`
- `POST /api/collections`
- `PUT /api/collections/:id`
- `DELETE /api/collections/:id`

### Mocks
- `GET /api/mocks`
- `GET /api/mocks/:id`
- `POST /api/mocks`
- `PUT /api/mocks/:id`
- `DELETE /api/mocks/:id`

### Request Logs
- `GET /api/request-response`
- `DELETE /api/request-response/:id`

---

---

## 🗂️ Folder Structure

```
mock-inspector/
├── Dockerfile
├── docker-compose.yml
├── .env
├── docker-entrypoint.sh
├── package.json
├── app.js
├── runMigrations.js
├── db.js
├── routes/
│   ├── index.js
│   ├── health.js
│   ├── collection.js
│   ├── mock.js
│   └── requestResponse.js
└── sql/
    ├── 001_create_collections.sql
    ├── 002_create_mocks.sql
    └── 003_create_request_response.sql
```
