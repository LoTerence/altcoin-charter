# Use official Node.js 20 as base image
FROM node:20.12-alpine3.18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the server and client
RUN npm run build

# Expose port 5000 for the server
EXPOSE 5000

# Start the application in production mode
CMD ["npm", "start"]