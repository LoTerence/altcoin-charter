const path = require("path");
const environment = process.env.TARGET_ENV || process.env.NODE_ENV || "development";
require("dotenv").config({
  path: path.join(__dirname, "..", `.env.${environment}`),
});

const chalk = require("chalk");
const mongoose = require("mongoose");
const connectDB = require("./db");
const Watchlist = require("../models/Watchlist");

async function createPublicWatchlist() {
  console.log("Creating Watchlist: PUBLIC ...");
  const exists = await Watchlist.findOne({ name: "PUBLIC" });
  if (exists) {
    console.log(`Watchlist ${exists.name} already exists.`);
    return null;
  }

  const publicCoins = new Watchlist({ name: "PUBLIC", coins: [] });
  await publicCoins.save();
  console.log(`Watchlist ${publicCoins.name} successfully created`);
}

// For now, all we need to do is create a public watchlist
const seedDB = async () => {
  console.log(`${chalk.green("✓")} ${chalk.blue("Seed DB script started...")}`);

  try {
    await createPublicWatchlist();
  } catch (error) {
    console.log(
      `${chalk.red("x")} ${chalk.blue("Error occurred while seeding database")}`
    );
    console.error(error);
    throw error;
  }

  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      "Seed DB script successfully completed."
    )}`
  );
};

(async () => {
  try {
    await connectDB();
    await seedDB();
  } catch (error) {
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
