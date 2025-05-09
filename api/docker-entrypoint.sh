#!/bin/bash

# Wait until PostgreSQL is ready
echo "Using DB_HOST=$DB_HOST, DB_USER=$DB_USER"

echo "Waiting for PostgreSQL at $DB_HOST..."
until pg_isready -h "$DB_HOST" -p 5432 -U "$DB_USER"; do
  sleep 1
done
export DATABASE_URL="postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:5432/$DB_NAME"

echo "PostgreSQL is up. Running migrations..."
node migrateAndSeed.js

echo "Starting server..."
exec node app.js
