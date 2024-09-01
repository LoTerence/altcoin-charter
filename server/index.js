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

const apiRoutes = require("./routes");
const connectDB = require("./utils/db");
const keys = require("./config/keys");
const serveStaticAssets = require("./serve-static-assets");

const { port } = keys;

connectDB();
const app = express();

app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          // TODO: move CC API calls from the client to the server
          "min-api.cryptocompare.com",
        ],
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
