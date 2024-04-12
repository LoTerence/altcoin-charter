# Use official Node.js 20 as base image
FROM node:20.12-alpine3.18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Expose port 3000 for the client
EXPOSE 3000

# Start the Vite client in development mode
CMD [ "npm", "start" ]
