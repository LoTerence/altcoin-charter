const mongoose = require("mongoose");
const { Schema } = mongoose;

const coinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  coinName: {
    type: String,
    required: true,
  },
});

const Coin = mongoose.model("Coin", coinSchema);
module.exports = Coin;
