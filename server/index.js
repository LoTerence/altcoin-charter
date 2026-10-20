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
if (!keys.binance.apiKey || !keys.binance.secretKey) {
  console.warn(
    `${chalk.red("✗")} BINANCE_API_KEY or BINANCE_SECRET_KEY is not set. New coins will be named by their ticker symbol.`
  );
}
const app = express();

app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'"],
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
