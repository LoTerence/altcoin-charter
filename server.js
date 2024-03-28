require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

const connectDB = require("./server/config/database");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// TODO: change this to setupDB
connectDB();

const app = express();

// Let Express parse requests from client forms
app.use(express.json());

// <-------------------------------------------  ROUTING  -----------------------------------------> //
// Express Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// CORS Middleware: Access the server from any domain name
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./server/config/passport");

// API Routes
// todo: put all this in one api file, like so:
// app.use(routes);
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
