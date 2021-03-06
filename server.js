// Require dependencies
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const cors = require("cors"); //access the server from any domain name
const connectDB = require("./config/database");

// allows project to read from .env
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/.env" });
}

// Instantiate express server
const app = express();

// let express parse requests from client forms
app.use(express.json());

// connecting to mongodb database
connectDB();

// <-------------------------------------------  ROUTING  -----------------------------------------> //
// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// CORS Middleware
app.use(cors());
/* TODO: add option {origin: "https://altcoin-charter.herokuapp.com/" } or whatever the origin that the 
front end is running on so the server can only accept requests from the front end 
app.use(cors({origin: "https://altcoin-charter.herokuapp.com/"}));
*/

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport"); // authentication strategy

// API express routing
app.use("/coins_unauth", require("./routes/coins_unauth")); // maybe change the name to "/coins_public"
app.use("/users", require("./routes/users"));

// <------------------------------------------  ROUTING OVER -----------------------------------------> //

// Express only serves static assets in production
// TODO: rebuild after revamping the client for 2020
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    res.sendFile(__dirname + "/client/build/index.html");
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
