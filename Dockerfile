# Multi-stage build for Angular app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the app for production
RUN npm run build:prod

# Production stage - using lightweight static server
FROM node:18-alpine

# Install serve package globally
RUN npm install -g serve

# Create app directory
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app/dist/uruti-web/browser ./dist

# Expose port 4200
EXPOSE 4200

# Start static server
CMD ["serve", "-s", "dist", "-l", "4200"] 