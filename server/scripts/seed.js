// TODO: eventually create a better seed script

const connectDB = require("../config/database");
const Watchlist = require("../models/Watchlist");

// For now, all we need to do is create a public watchlist
const seedDB = async () => {
  try {
    console.log(`${chalk.blue("✓")} ${chalk.blue("seed DB started")}`);
    const publicCoins = new Watchlist({ name: "PUBLIC", coins: [] });
    console.log(publicCoins.name);
    await publicCoins.save();

    console.log(`${chalk.green("✓")} ${chalk.green("seed DB finished")}`);
  } catch (error) {
    console.log(
      `${chalk.red("x")} ${chalk.red("error while seeding database")}`
    );
    console.error(error);
    return null;
  }
};

(async () => {
  await connectDB();
  await seedDB();
  process.exit(0);
})();
