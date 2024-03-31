# Use official Node.js 20 as base image
FROM node:lts-alpine3.19

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the server
EXPOSE 5000

# Start the server
CMD ["npm", "start"]