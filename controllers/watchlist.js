/* 
Controllers for managing the public list of coins
*/
const Coin = require("../models/Coin");
const Watchlist = require("../models/Watchlist");

const getPublicCoins = async (req, res) => {
  try {
    const public = await Watchlist.findOne({ name: "PUBLIC" });
    const coins = await Coin.find({ _id: public.coins });

    return res.status(200).json({
      data: coins,
      message: "List of coins successfully found",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Failed to fetch data",
      success: false,
    });
  }
};

const addCoin = async (req, res) => {
  const data = req.body;

  try {
    const public = await Watchlist.findOne({ name: "PUBLIC" });
    let newCoin = await Coin.findOne({ symbol: data.symbol });
    if (!newCoin?._id) {
      newCoin = await Coin.create(data);
    }

    public.coins.push(newCoin._id);
    await public.save();

    return res.status(200).json({
      data: newCoin,
      message: "Coin was successfully added",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Failed to fetch data",
      success: false,
    });
  }
};

const removeCoinById = async (req, res) => {
  const oid = req.params.id;

  try {
    const public = await Watchlist.findOne({ name: "PUBLIC" });

    const newCoins = public.coins.filter((id) => !id.equals(oid));

    public.coins = newCoins;
    await public.save();

    return res.status(200).json({
      data: {},
      message: "Coin was successfully deleted",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Failed to delete coin",
      success: false,
    });
  }
};

module.exports = { addCoin, getPublicCoins, removeCoinById };
