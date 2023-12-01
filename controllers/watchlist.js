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
      success: true,
      message: "List of coins successfully found",
      data: coins,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch data",
    });
  }
};

const addCoin = async (req, res) => {
  const data = req.body;

  try {
    const public = await Watchlist.findOne({ name: "PUBLIC" });
    let newCoin = await Coin.findOne({ Symbol: data.Symbol });
    if (!newCoin._id) {
      newCoin = await Coin.create(data);
    }

    public.coins.push(newCoin._id);
    await public.save();

    return res.status(200).json({
      success: true,
      message: "Coin was successfully added",
      data: newCoin,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch data",
    });
  }
};

const removeCoinById = async (req, res) => {
  const oid = req.params.id;

  try {
    const public = await Watchlist.findOne({ name: "PUBLIC" });

    const newCoins = public.coins.filter((c) => !c._id.equals(oid));

    public.coins = newCoins;
    await public.save();

    return res.status(200).json({
      success: true,
      message: "Coin was successfully deleted",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch data",
    });
  }
};

module.exports = { addCoin, getPublicCoins, removeCoinById };
