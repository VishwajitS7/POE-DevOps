
# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package configuration
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Run automated tests and build application
RUN npm run build


# Stage 2: Deploy using Nginx
FROM nginx:alpine

# Copy generated website into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose web server port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
