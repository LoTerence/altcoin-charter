const chalk = require("chalk");
const connectDB = require("./db");
const Watchlist = require("../models/Watchlist");

// For now, all we need to do is create a public watchlist
const seedDB = async () => {
  try {
    console.log(`${chalk.blue("✓")} ${chalk.blue("seed DB started")}`);

    const exists = await Watchlist.findOne({ name: "PUBLIC" });

    if (exists) {
      console.log(`Watchlist ${exists.name} already exists`);
      return null;
    }

    const publicCoins = new Watchlist({ name: "PUBLIC", coins: [] });
    await publicCoins.save();
    console.log(`Watchlist ${publicCoins.name} successfully created`);
  } catch (error) {
    console.log(
      `${chalk.red("x")} ${chalk.red("error while seeding database")}`
    );
    console.error(error);
    return null;
  } finally {
    console.log(`${chalk.green("✓")} ${chalk.green("seed DB finished")}`);
  }
};

(async () => {
  await connectDB();
  await seedDB();
  process.exit(0);
})();
