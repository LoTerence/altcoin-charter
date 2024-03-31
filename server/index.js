const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const apiRoutes = require("./routes");
const connectDB = require("./utils/db");
const keys = require("./config/keys");
const useStaticAssets = require("./serveClient");

const { port } = keys;

connectDB();
const app = express();

app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  session({
    secret: keys.session.secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());

require("./config/passport")(app);
app.use(apiRoutes);

useStaticAssets(app);

app.listen(port, (error) => {
  error && console.error(error);
  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});
