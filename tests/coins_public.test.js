const { getCoinList, addCoin } = require("../controllers/coins_public");
const Coin = require("../models/Coin");
// const db = require("./db");
import { mongod as db } from "./db";

// when unit testing, each test should start on a blank canvas
beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("coins added when", () => {
  it("First coin added", async (done) => {
    const { coinId } = await addCoin({
      Id: "1182",
      Name: "BTC",
      Symbol: "BTC",
      CoinName: "Bitcoin",
    });

    //find the coin from the db
    const coin = await Coin.findById(coinId);

    // check the name, symbol, etc of the coin found
    expect(coin.Name).toEqual("BTC");
    expect(coin.Symbol).toEqual("BTC");
    expect(coin.CoinName).toEqual("Bitcoin");

    done();
  });
});
