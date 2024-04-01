# CryptoCharts

See the histories of cryptocurrencies you saved

Built with the MERN stack
- React + Redux front end 
- Node.js, Express, and MongoDB backend
- Includes authentication with Passport.js - OAuth2.0 with google and facebook
- Bootstrap 5 for the UI components

Example of the app is deployed on:
https://cryptocharts.koyomi-ai.com/

## Quick Start

```bash
# Install dependencies
npm install

# Install dependencies for client & server
npm run install-app

# Run the client & server in development mode
npm run dev
# Server runs on http://localhost:5000 and client on http://localhost:3000

# Build the client
npm run build:client

# Run the app in production mode
npm start

```

## Docker Instructions

```bash
# Pull the prod image from docker hub
docker pull loterence10/altcoin-charter

# Run the image on your local machine
docker run -p 8888:5000 loterence10/altcoin-charter
http://localhost:8888
```

## App Info

### Authors

Terence Lo

### Version

1.5.0

### License

This project is licensed under the MIT License
