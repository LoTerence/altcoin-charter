const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Coin Schema
const CoinSchema = mongoose.Schema({
  Id: {
    //they need id for mapping components in react
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Symbol: {
    type: String,
    required: true,
    unique: true,
  },
  CoinName: {
    type: String,
    required: true,
  },
});

CoinSchema.plugin(uniqueValidator);

const Coin = (module.exports = mongoose.model("Coin", CoinSchema));

// -------------------------------------------------- Services -------------------------------------------------- //
// @param newCoin takes a coin object and saves it to the collection
module.exports.addCoin = async function (newCoin) {
  try {
    return Coin.create(newCoin);
  } catch (err) {
    throw err;
  }
};

// return list of all coins in public coin list
module.exports.getCoinList = async function () {
  try {
    return Coin.find({});
  } catch (err) {
    throw err;
  }
};

// find coin by _id not Id
module.exports.getCoinBy_id = async (id, callback) => {
  const c = await Coin.findById(id);
  callback(c);
};

module.exports.getCoinBySymbol = async (symbol, callback) => {
  const query = { Symbol: symbol };
  const c = await Coin.findOne(query);
  callback(c);
};

// @desc delete a coin with its symbol
// @param symbol - the symbol of the coin that will be deleted
module.exports.deleteCoinBySymbol = (symbol) => {
  try {
    const query = { Symbol: symbol };
    return Coin.findOneAndDelete(query);
  } catch (err) {
    throw err;
  }
};

// @desc delete a coin by id
// @param id - the id of the coin that will be deleted
module.exports.deleteCoinById = (id) => {
  try {
    const query = { _id: id };
    return Coin.findOneAndDelete(query);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
