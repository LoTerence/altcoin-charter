# CryptoCharts

See the histories of cryptocurrencies you saved

Built with the MERN stack
- React + Redux front end 
- Node.js, Express, and MongoDB backend
- Includes authentication with Passport.js - OAuth2.0 with google and facebook
- Bootstrap 5 for the UI components

<!-- Example of the app is deployed on:
https://altcoin-charter-prod-43963c381922.herokuapp.com -->

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Docker Instructions

```bash
# Pull the prod image from docker hub
docker pull loterence10/altcoin-charter

# Run the image on your local machine
docker run -p 8888:5000 loterence10/altcoin-charter

# Build a new image
docker build -t yourusername/altcoin-charter .
```

<!-- Staging link:
https://altcoin-charter-staging-c12857019436.herokuapp.com/ -->


## App Info

### Authors

Terence Lo

### Version

1.5.0

### License

This project is licensed under the MIT License
