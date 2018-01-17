// Require dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');  //access the server from any domain name
const passport =  require('passport');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On database connection error
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});

// Instantiate express server
const app = express();

const users = require('./routes/users');

//PORT Number
const port = 5000;

//CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);  // authentication strategy

app.use('/users',users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => `Server running on port ${port}`);