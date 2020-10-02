// Require dependencies
const express = require("express");
const dotenv = require("dotenv");
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
//CORS Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport); // authentication strategy

// express routing
app.use("/users", require("./routes/users"));
app.use("/coins_unauth", require("./routes/coins_unauth"));

// <------------------------------------------  ROUTING OVER -----------------------------------------> //

// Express only serves static assets in production
// TODO: rebuild after revamping the client for 2020
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = Number(process.env.PORT || 5000);

app.listen(PORT, (error) =>
  error
    ? console.error(error)
    : console.info(
        `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
      )
);
