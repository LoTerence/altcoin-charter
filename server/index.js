const path = require("path");
const environment = process.env?.TARGET_ENV || process.env.NODE_ENV;
require("dotenv").config({
  path: path.join(__dirname, `.env.${environment}`),
});

const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const { logError, isOperationalError } = require("./middleware/error-handler");
const apiRoutes = require("./routes");
const connectDB = require("./utils/db");
const keys = require("./config/keys");
const serveStaticAssets = require("./utils/serve-static-assets");

const { port } = keys;

connectDB();
const app = express();

app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": [
          "'self'",
          "'sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'",
          "'sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'",
          "'sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl'",
        ],
        // TODO: move CC API calls from the client to the server
        "connect-src": ["'self'", "min-api.cryptocompare.com"],
      },
    },
    // enable popups for google and fb oauth login
    crossOriginOpenerPolicy: "same-origin-allow-popups",
    // CORS policy is handled by cors()
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);
app.use(
  session({
    secret: keys.session.secret,
    resave: true,
    saveUninitialized: true,
  })
);

require("./config/passport")(app);
app.use(apiRoutes);

serveStaticAssets(app);

app.listen(port, (error) => {
  error && console.error(error);
  console.log(
    `${chalk.green("✓")} Server started in ${chalk.yellow(
      `${process.env.NODE_ENV}`
    )} mode.`
  );
  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    logError(error);
    if (!isOperationalError(error)) {
      process.exit(1);
    }
  });
