const Coin = require("../models/Coin");
const { Api404Error } = require("../utils/error-classes");

const getCoinList = async (req, res) => {
  try {
    const coins = await Coin.find({});

    return res.status(200).json({
      success: true,
      message: "List of coins successfully found.",
      data: coins,
    });
  } catch (err) {
    next(err);
  }
};

const getCoinById = async (req, res, next) => {
  const oid = req.params.oid;
  try {
    const coin = await Coin.findOne({ _id: oid });
    if (!coin) {
      throw new Api404Error(`Coin ${oid} not found.`);
    }

    return res.status(200).json({
      success: true,
      message: "Coin successfully found.",
      data: coin,
    });
  } catch (err) {
    next(err);
  }
};

const addCoin = async (req, res) => {
  const data = req.body;
  try {
    const newCoin = await Coin.create(data);

    return res.status(200).json({
      success: true,
      message: "Coin was successfully added.",
      data: newCoin,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(200).json({
        success: false,
        error: `There is already a coin with this symbol: ${data.symbol}`,
      });
    }
    next(err);
  }
};

const deleteCoinById = async (req, res) => {
  const oid = req.params.oid;
  try {
    const coin = await Coin.Coin.deleteOne({ _id: oid });
    if (!coin) {
      throw new Api404Error(`Failed to delete coin. Coin ${oid} not found.`);
    }

    return res.status(200).json({
      success: true,
      message: "Coin was successfully deleted.",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addCoin, getCoinById, getCoinList, deleteCoinById };
