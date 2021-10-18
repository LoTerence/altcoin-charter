// This router will be for accessing the collection in database that stores a list of coins saved by unauthorized users
const express = require("express");
const router = express.Router();

const {
  getCoinList,
  addCoin,
  deleteCoin,
} = require("../controllers/coins_public");

router.route("/coinList").get(getCoinList).post(addCoin);

router.delete("/coinList/:coin_symbol", deleteCoin);

module.exports = router;
