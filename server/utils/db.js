require("dotenv").config();
const chalk = require("chalk");
const mongoose = require("mongoose");

const keys = require("../config/keys");
const Coin = require("../models/Coin");
const { database } = keys;

// coins used to require a unique cryptoCompareId. That index rejects every
// new coin after the first one since they no longer have the field, so drop it
const dropLegacyCoinIndex = async () => {
  const indexes = await Coin.collection.indexes().catch(() => []);
  if (indexes.some((index) => index.name === "cryptoCompareId_1")) {
    await Coin.collection.dropIndex("cryptoCompareId_1");
    console.log(`${chalk.green("✓")} Dropped legacy cryptoCompareId index`);
  }
};

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(database.url, {
      dbName: "altcoin-charter",
    });

    console.log(
      `${chalk.green("✓")} ${chalk.blue("MongoDB Connected:")} ${
        conn.connection.host
      }`
    );

    await dropLegacyCoinIndex().catch(console.error);
  } catch (err) {
    console.error(
      `${chalk.red("❌ SERVER ERROR -")} MongoDB Connection Error: ${
        err.message
      }`
    );
    console.log(err);
    throw err;
  }
};

module.exports = connectDB;
