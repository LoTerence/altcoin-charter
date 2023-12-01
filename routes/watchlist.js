const express = require("express");
const router = express.Router();

const {
  getPublicCoins,
  addCoin,
  removeCoinById,
} = require("../controllers/watchlist");

router.route("/public").get(getPublicCoins).post(addCoin);

router.delete("/public/:id", removeCoinById);

module.exports = router;
