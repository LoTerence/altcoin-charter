const mongoose = require("mongoose");
const { Schema } = mongoose;

// save the public list of coins' ids in the db
const watchlistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coins: [Schema.Types.ObjectId],
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
