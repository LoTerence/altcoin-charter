const router = require("express").Router();
const apiRoutes = require("./api");
const keys = require("../config/keys");
const { apiURL } = keys.app;
const {
  returnError,
  logErrorMiddleware,
} = require("../middleware/error-handler");

const api = `/${apiURL}`;

// api routes
router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json("No API route found"));

// oauth routes
router.use("/oauth", require("./oauth"));

// error handler middleware
router.use(logErrorMiddleware);
router.use(returnError);

module.exports = router;
