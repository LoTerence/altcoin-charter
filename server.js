require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

const keys = require("./server/config/keys");
const routes = require("./server/routes");
const connectDB = require("./server/utils/database");

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
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
// TODO: define a Content Security Policy
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./server/config/passport");

// API Routes
app.use(routes);

const useStaticAssets = () => {
  // Compress static assets to gzip before serving
  const compress = require("compression");
  app.use(compress());

  const staticAssetsPath = path.join(__dirname, "client/dist");
  app.use(express.static(staticAssetsPath));

  app.get("*", (req, res) => {
    res.sendFile(staticAssetsPath + "/index.html");
  });
};

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  useStaticAssets();
}

app.listen(port, (error) =>
  error
    ? console.error(error)
    : console.info(
        `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
      )
);
