// This router will be for accessing the collection in database that stores a list of coins saved by unauthorized users
const express = require("express");
const router = express.Router();

const {
  getCoinList,
  addCoin,
  deleteCoin,
} = require("../controllers/coins_unauth");

router.route("/coinList").get(getCoinList).post(addCoin);

router.delete("/coinList/:coin_symbol", deleteCoin);

module.exports = router;

// // get array of all the coins from collection
// router.get("/coinList", (req, res) => {
//   Coin.find({}, (err, coins) => {
//     if (err) throw err;

//     let coinArr = [];

//     coins.forEach((coin) => {
//       coinArr.push(coin);
//     });

//     res.send(coinArr);
//   });
// });

// add coin to collection
// router.post("/addCoin", (req, res, next) => {
//   let newCoin = new Coin({
//     Id: req.body.Id,
//     Name: req.body.Name,
//     Symbol: req.body.Symbol,
//     CoinName: req.body.CoinName,
//   });

//   Coin.addCoin(newCoin, (err, coin) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json({ success: true, msg: "Coin added" });
//     }
//   });
// });

// delete coin from collection
// router.delete("/coinList/:coin_symbol", (req, res) => {
//   Coin.deleteCoinBySymbol(req.params.coin_symbol, (err, coin) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json({ msg: "Successfully deleted coin" });
//     }
//   });
// });
