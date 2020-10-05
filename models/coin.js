const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Coin Schema
const CoinSchema = mongoose.Schema({
  Id: {
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
// @param query - should be an object representing the model.find query for mongoose
module.exports.getCoinList = async function (query) {
  try {
    return Coin.find(query);
  } catch (err) {
    throw err;
  }
};

module.exports.getCoinById = function (id, callback) {
  Coin.findById(id, callback);
};

module.exports.getCoinBySymbol = function (symbol, callback) {
  const query = { Symbol: symbol };
  Coin.findOne(query, callback);
};

// @param newCoin takes a coin object and saves it to the collection
module.exports.addCoin = async function (newCoin) {
  try {
    return Coin.create(newCoin);
  } catch (err) {
    throw err;
  }
};

// @desc delete a coin with its symbol
// @param symbol - the symbol of the coin that will be deleted
module.exports.deleteCoinBySymbol = function (symbol) {
  try {
    const query = { Symbol: symbol };
    return Coin.findOneAndDelete(query);
  } catch (err) {
    throw err;
  }
};
