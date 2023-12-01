const Coin = require("../models/Coin");

const getCoinList = async (req, res) => {
  try {
    const coins = await Coin.find({});

    return res.status(200).json({
      success: true,
      message: "List of coins successfully found",
      data: coins,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const getCoinById = async (req, res) => {
  const oid = req.params.oid;
  try {
    const coin = await Coin.findOne({ _id: oid });

    return res.status(200).json({
      success: true,
      message: "Coin successfully found",
      data: coin,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const addCoin = async (req, res) => {
  const data = req.body;
  try {
    const newCoin = await Coin.create(data);

    return res.status(200).json({
      success: true,
      message: "Coin was successfully added",
      data: newCoin,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(200).json({
        success: false,
        error: "There is already a coin with this symbol: " + data.symbol,
      });
    }
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const deleteCoinById = async (req, res) => {
  const oid = req.params.oid;
  try {
    const coin = await Coin.Coin.deleteOne({ _id: oid });

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

module.exports = { addCoin, getCoinById, getCoinList, deleteCoinById };
