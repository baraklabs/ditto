# Ditto

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Ditto Website](https://img.shields.io/badge/Website-baraklabs.com-blue?logo=google-chrome)](https://baraklabs.com/ditto)
[![Cloud Deployment](https://img.shields.io/badge/Cloud%20Instance-baraklabs.com-green?logo=cloud)](https://baraklabs.com)

Ditto is a lightweight mock API server, simulate dynamic responses...

- Creating mock endpoints with custom request/response behavior
- Viewing and logging incoming requests
- Organizing mocks by collections

## 🧩 Tech Stack

- **Frontend**: React (TailwindCSS, Vite or CRA)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL for database
- **Containerization**: Docker & Docker Compose

---

## ⚙️ Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ▶️ How to Start the Server

### 1. Clone the repo

````bash
git clone https://github.com/baraklabs/ditto.git
cd ditto
### ✅ 2. Build & Start Docker Compose

```bash
docker-compose up --build
````

This will:

1. Pull the `postgres` image
2. Build your Node.js app image
3. Start the database and wait for it
4. Run migrations using `migrateAndSeed.js`
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
  curl http://localhost:3001/api/ditto/health
  ```

If successful, you'll see:

```json
{ "status": "ok" }
```

---

## 🔧 APIs Available

### Health Check

`GET /api/ditto/health`

### Collections

- `GET /api/ditto/collections`
- `GET /api/ditto/collections/:id`
- `POST /api/ditto/collections`
- `PUT /api/ditto/collections/:id`
- `DELETE /api/ditto/collections/:id`

### Mocks

- `GET /api/ditto/mocks`
- `GET /api/ditto/mocks/:id`
- `POST /api/ditto/mocks`
- `PUT /api/ditto/mocks/:id`
- `DELETE /api/ditto/mocks/:id`

### Request Logs

- `GET /api/ditto/request-response`
- `DELETE /api/ditto/request-response/:id`

---

---

## 🗂️ Folder Structure

```
Ditto/
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

---

## 💖 Sponsor Ditto

Sponsorships help keep Ditto running smoothly and actively maintained.

Your support will go **directly toward keeping the product afloat** — covering hosting, bug fixes, and continuous improvements.

However, we would **love to know why you're choosing to sponsor us**.  
It could be as simple as:

> "Ditto helped in our day-to-day tasks!"  
> or  
> "Hi 👋 – just wanted to show appreciation!"

Please drop us a quick note at **info@baraklabs.com**

_– Team BarakLabs 💚_

### Support us via:

[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-000?style=for-the-badge&logo=github)](https://github.com/sponsors/baraklabs)

---

[![Made in India](https://img.shields.io/badge/Made%20with%20❤️%20in-India-orange?style=for-the-badge)](https://baraklabs.com)
