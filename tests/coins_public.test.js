/* 
For testing the Coin mongoose model, services, and controller
*/
const db = require("./db");

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

const coinComplete2 = {
  Id: "7605",
  Name: "ETH",
  Symbol: "ETH",
  CoinName: "Ethereum",
};

describe("Coin model and services", () => {
  it("a coin document can be added to db collection correctly", async () => {
    await Coin.addCoin(coinComplete);

    //find the coin from the db
    await Coin.getCoinBySymbol(coinComplete.Symbol, (coin) => {
      // check the name, symbol, etc of the coin found
      expect(coin.Name).toEqual("BTC");
      expect(coin.Symbol).toEqual("BTC");
      expect(coin.CoinName).toEqual("Bitcoin");
    });
  });

  it("can get the collection of coins", async () => {
    await Coin.addCoin(coinComplete);
    await Coin.addCoin(coinComplete2);

    const coins = await Coin.getCoinList();

    expect(coins[0].Symbol).toEqual("BTC");
    expect(coins[0].Name).toEqual("BTC");
    expect(coins[0].CoinName).toEqual("Bitcoin");
    expect(coins[1].Symbol).toEqual("ETH");
    expect(coins[1].Name).toEqual("ETH");
    expect(coins[1].CoinName).toEqual("Ethereum");
  });

  it("can delete a coin from the list", async () => {
    await Coin.addCoin(coinComplete);
    await Coin.addCoin(coinComplete2);

    const deletedcoin = await Coin.deleteCoinBySymbol(coinComplete.Symbol);
    const coins = await Coin.getCoinList();

    expect(deletedcoin.Symbol).toEqual("BTC");
    expect(coins[0].Symbol).toEqual("ETH");
    expect(coins[0].Name).toEqual("ETH");
    expect(coins[0].CoinName).toEqual("Ethereum");
  });
});
