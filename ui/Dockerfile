# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ARG VITE_ENABLE_LOGIN
ENV VITE_ENABLE_LOGIN=${VITE_ENABLE_LOGIN}

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code and build the app
COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine


# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build artifacts from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port for the server
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
