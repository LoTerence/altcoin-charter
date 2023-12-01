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

describe("Coin model and services", () => {});
