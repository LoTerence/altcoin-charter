# Use official Node.js 20 as base image
FROM node:20-alpine3.20

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the server
EXPOSE 5000

# Start the development server
CMD ["npm", "run", "dev"]