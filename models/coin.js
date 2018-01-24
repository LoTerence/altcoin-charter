const mongoose = require('mongoose');
const config = require('../config/database');

// Coin Schema
const CoinSchema = mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Symbol: {
        type: String,
        required: true
    },
    CoinName: {
        type: String,
        required: true
    },
});

const Coin = module.exports = mongoose.model('Coin', CoinSchema);

module.exports.getCoinById = function(id, callback){
    Coin.findById(id, callback);
};

module.exports.getCoinBySymbol = function(symbol, callback){
    const query = {Symbol: symbol};
    Coin.findOne(query, callback);
};

module.exports.addCoin = function(newCoin, callback){
    newCoin.save(callback);
};

module.exports.deleteCoinBySymbol = function(symbol, callback){
    const query = {Symbol: symbol};
    Coin.findOneAndRemove(query, callback);
};