const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const connectDB = require("./server/config/database");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

connectDB();

const app = express();

// let express parse requests from client forms
app.use(express.json());

// <-------------------------------------------  ROUTING  -----------------------------------------> //
// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// CORS Middleware: access the server from any domain name
app.use(cors());
/* TODO: add option {origin: "https://altcoin-charter.herokuapp.com/" } or whatever the origin that the 
  front end is running on so the prod server can only accept requests from the front end. 
  We can maybe use process.env.CLIENT_URL here */
// app.use(cors({origin: "https://altcoin-charter.herokuapp.com/"}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./server/config/passport"); // authentication strategy

// API express routing
app.use("/api/coins", require("./server/routes/coins"));
app.use("/api/watchlist", require("./server/routes/watchlist"));
app.use("/api/users", require("./server/routes/users"));
app.use("/oauth", require("./server/routes/oauth"));

// <------------------------------------------  SERVE -----------------------------------------> //
if (process.env.NODE_ENV === "production") {
  // Compress static assets to gzip before serving to client
  const compress = require("compression");
  app.use(compress());

  // Express only serves static assets in production
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/dist/index.html");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) =>
  error
    ? console.error(error)
    : console.info(
        `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
      )
);
