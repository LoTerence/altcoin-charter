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
const useStaticAssets = require("./serveClient");

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

useStaticAssets(app);

const { port } = keys;

app.listen(port, (error) =>
  error
    ? console.error(error)
    : console.info(
        `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
      )
);
