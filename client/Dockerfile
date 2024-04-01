# Use official Node.js 20 as base image
FROM node:lts-alpine3.19

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Set dev env vars
RUN mv .env.example .env

# Build the client for production
RUN npm run build

# Expose port 3000 for the client
EXPOSE 3000

# Start the React client
CMD [ "npm", "start" ]
