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

// handle get requests to '/api/customers'
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

//PORT Number
const PORT = Number(process.env.PORT || 5000);

//CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);  // authentication strategy

// Make a route for '/users' connected to users
const users = require('./routes/users');
app.use('/users',users);

//Make a route for '/coins_unauth' connected to unauthorized users list of altcoins
const coins_unauth = require('./routes/coins_unauth');
app.use('/coins_unauth',coins_unauth);

// Index Route 
app.get('/', (req, res) => {
  res.sendFile('./client/build/index.html');
}); 

// Express only serves static assets in production
//app.use('/', express.static('./client/build'));



// Start Server
app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));