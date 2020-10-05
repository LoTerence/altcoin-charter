const Coin = require("../models/Coin");

// @desc Get list of all public coins
// @route GET /coins_unauth/coinList
// @access only from client
exports.getCoinList = async (req, res) => {
  try {
    const coins = await Coin.getCoinList({});

    return res.status(200).json({
      success: true,
      msg: "List of coins successfully found",
      data: coins,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc Add a new coin to the public coin list
// @route POST /coins_unauth/coinList
// @access only from client
exports.addCoin = async (req, res) => {
  try {
    const newCoin = await Coin.addCoin(req.body);

    return res.status(200).json({
      success: true,
      msg: "Coin was successfully added",
      data: newCoin,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc Delete a coin from the public coin list
// @route DELETE /coins_unauth/coinList/:coin_symbol
// @access only from client
exports.deleteCoin = async (req, res) => {
  try {
    const coin = await Coin.deleteCoinBySymbol(req.params.coin_symbol);

    if (!coin) {
      return res.status(404).json({
        success: false,
        error: "No coin with that symbol found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Coin was successfully deleted",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
