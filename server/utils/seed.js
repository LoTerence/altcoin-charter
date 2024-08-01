const chalk = require("chalk");
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
    return null;
  }

  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      "Seed DB script successfully completed."
    )}`
  );
};

(async () => {
  await connectDB();
  await seedDB();
  process.exit(0);
})();
