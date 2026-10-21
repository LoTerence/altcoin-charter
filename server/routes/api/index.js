const router = require("express").Router();

const coinRoutes = require("./coins");
const marketRoutes = require("./market");
const userRoutes = require("./users");
const watchlistRoutes = require("./watchlist");

// coin routes
router.use("/coins", coinRoutes);

// crypto market data routes
router.use("/market", marketRoutes);

// watchlist routes
router.use("/watchlist", watchlistRoutes);

// user routes
router.use("/users", userRoutes);

module.exports = router;
