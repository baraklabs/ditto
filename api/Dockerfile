FROM node:18

# Install PostgreSQL client tools (for pg_isready)
RUN apt-get update && apt-get install -y postgresql-client

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Make entrypoint executable
RUN chmod +x docker-entrypoint.sh

# Start script
ENTRYPOINT ["./docker-entrypoint.sh"]
