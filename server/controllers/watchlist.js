/* 
Controllers for managing the public list of coins
*/
const Coin = require("../models/Coin");
const Watchlist = require("../models/Watchlist");

const createPublicWatchlist = async () => {
  const publicList = new Watchlist({ name: "PUBLIC", coins: [] });
  await publicList.save();
  console.log(`Watchlist ${publicList.name} successfully created`);
  return publicList;
};

const getPublicCoins = async (req, res) => {
  try {
    let publicList = await Watchlist.findOne({ name: "PUBLIC" });
    if (!publicList) {
      publicList = await createPublicWatchlist();
    }

    const coins = await Coin.find({ _id: publicList.coins });

    return res.status(200).json({
      data: coins,
      message: "List of coins successfully found",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const addCoin = async (req, res) => {
  const data = req.body;
  try {
    const public = await Watchlist.findOne({ name: "PUBLIC" });
    let coin = await Coin.findOne({ symbol: data.symbol });
    if (!coin?._id) {
      coin = await Coin.create(data);
    }

    const isListed = public.coins.some((oid) => oid.equals(coin._id));
    if (isListed) {
      return res.status(200).json({
        error: "That coin is already on the list",
        success: false,
      });
    }

    public.coins.push(coin._id);
    await public.save();

    return res.status(200).json({
      data: coin,
      message: "Coin was successfully added",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const removeCoinById = async (req, res) => {
  const oid = req.params.id;
  try {
    const public = await Watchlist.findOne({ name: "PUBLIC" });
    public.coins = public.coins.filter((id) => !id.equals(oid));
    await public.save();
    return res.status(200).json({
      data: {},
      message: "Coin was successfully deleted",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addCoin, getPublicCoins, removeCoinById };
