const Coin = require("../models/Coin");

// TODO: clean up this file so there are better status codes and returns more informative data

// @desc Get list of all public coins
// @route GET /coins_public/coinList
// @access only from client
exports.getCoinList = async (req, res) => {
  try {
    const coins = await Coin.getCoinList();

    return res.status(200).json({
      success: true,
      message: "List of coins successfully found",
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
// @route POST /coins_public/coinList
// @access only from client
exports.addCoin = async (req, res) => {
  try {
    const newCoin = await Coin.addCoin(req.body);

    return res.status(200).json({
      success: true,
      message: "Coin was successfully added",
      data: newCoin,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(200).json({
        success: false,
        error: "There is already a coin with this symbol: " + req.body.Symbol,
      });
    }
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc Delete a coin from the public coin list by symbol
// @route DELETE /coins_public/coinList/:coin_symbol
// @access only from client
exports.deleteCoinBySymbol = async (req, res) => {
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
      message: "Coin was successfully deleted",
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

// @desc Delete a coin from the public coin list by id
// @route DELETE /coins_public/coinList/:id
// @access only from client
exports.deleteCoin = async (req, res) => {
  try {
    const coin = await Coin.deleteCoinById(req.params.id);

    if (!coin) {
      return res.status(404).json({
        success: false,
        error: "No coin with that id found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coin was successfully deleted",
      data: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
