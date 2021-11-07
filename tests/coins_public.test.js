const mongoose = require("mongoose");
const db = require("./db");
// import { mongod as db } from "./db";

// const { getCoinList, addCoin } = require("../controllers/coins_public");
const Coin = require("../models/Coin");

// when unit testing, each test should start on a blank canvas
beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

// complete coin example
const coinComplete = {
  Id: "1182",
  Name: "BTC",
  Symbol: "BTC",
  CoinName: "Bitcoin",
};

describe("Coin", () => {
  it("can be added to db correctly", async () => {
    await Coin.addCoin(coinComplete);

    //find the coin from the db
    await Coin.getCoinBySymbol(coinComplete.Symbol, (coin) => {
      // check the name, symbol, etc of the coin found
      expect(coin.Name).toEqual("BTC");
      expect(coin.Symbol).toEqual("BTC");
      expect(coin.CoinName).toEqual("Bitcoin");
    });
  });
});
