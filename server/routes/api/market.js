const express = require("express");
const router = express.Router();

const {
  getAllCoins,
  getCoinDetails,
  getCoinPrice,
  getCoinHistory,
} = require("../../controllers/market");

router.get("/coins", getAllCoins);

router.get("/coins/:symbol", getCoinDetails);

router.get("/price/:symbol", getCoinPrice);

router.get("/history/:symbol", getCoinHistory);

module.exports = router;
