require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

const keys = require("./server/config/keys");
const apiRoutes = require("./server/routes");
const connectDB = require("./server/utils/db");

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

require("./server/config/passport")(app);
app.use(apiRoutes);

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

const { port } = keys;

app.listen(port, (error) =>
  error
    ? console.error(error)
    : console.info(
        `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
      )
);
