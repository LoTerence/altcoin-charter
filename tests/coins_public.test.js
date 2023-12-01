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
  cryptoCompareId: "1182",
  name: "BTC",
  symbol: "BTC",
  coinName: "Bitcoin",
};

const coinComplete2 = {
  cryptoCompareId: "7605",
  name: "ETH",
  symbol: "ETH",
  coinName: "Ethereum",
};

describe("Coin model and services", () => {});
