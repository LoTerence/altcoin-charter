// Creates a public watchlist in your Mongo DB

const dotenv = require("dotenv");
const connectDB = require("../config/database");
const Watchlist = require("../models/Watchlist");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const createPublicCoinList = async () => {
  console.log("creating public coin list..");
  const publicCoins = new Watchlist({ name: "PUBLIC", coins: [] });
  console.log(publicCoins.name);
  await publicCoins.save();
};

const main = async () => {
  await connectDB();
  await createPublicCoinList();

  console.log("watchlist script finished");
  process.exit(0);
};

main();
