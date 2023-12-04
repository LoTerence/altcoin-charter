const express = require("express");
const router = express.Router();

const {
  addCoin,
  getCoinById,
  getCoinList,
  deleteCoinById,
} = require("../controllers/coins");

router.route("").get(getCoinList).post(addCoin);

router.route("/:oid").get(getCoinById).delete(deleteCoinById);

module.exports = router;
