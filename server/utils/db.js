require("dotenv").config();
const chalk = require("chalk");
const mongoose = require("mongoose");

const keys = require("../config/keys");
const { database } = keys;

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
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
