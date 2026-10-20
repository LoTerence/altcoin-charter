/*
Controllers for crypto market data, sourced from the Binance.US API
*/
const crypto = require("crypto");
const keys = require("../config/keys");
const { Api400Error, Api404Error } = require("../utils/error-classes");

const BASE_URL = "https://api.binance.us";
// prefer USD pairs, fall back to USDT for coins with no USD pair
const QUOTE_ASSETS = ["USD", "USDT"];
const INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1d"];
const MAX_HISTORY_LIMIT = 1000;

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const CACHE_TTL = {
  price: 30 * 1000,
  history: MINUTE,
  coins: 24 * HOUR,
};

const cache = new Map();
const inFlight = new Map();

// run `load` at most once per `ttl` ms for a given key, sharing concurrent calls
const cached = async (key, ttl, load) => {
  const entry = cache.get(key);
  if (entry && entry.expires > Date.now()) {
    return entry.value;
  }

  if (!inFlight.has(key)) {
    const request = load().finally(() => inFlight.delete(key));
    inFlight.set(key, request);
  }
  const value = await inFlight.get(key);
  cache.set(key, { value, expires: Date.now() + ttl });
  return value;
};

const requestBinance = async (path, params = {}, { signed = false } = {}) => {
  const query = new URLSearchParams(params);
  const headers = {};
  if (signed) {
    query.set("timestamp", Date.now());
    const signature = crypto
      .createHmac("sha256", keys.binance.secretKey)
      .update(query.toString())
      .digest("hex");
    query.set("signature", signature);
    headers["X-MBX-APIKEY"] = keys.binance.apiKey;
  }

  const res = await fetch(`${BASE_URL}${path}?${query}`, { headers });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(`Binance ${path} failed (${res.status}): ${body?.msg}`);
  }
  return body;
};

// full asset names (ie. BTC -> Bitcoin) are only available from a signed endpoint
const getAssetNames = async () => {
  if (!keys.binance.apiKey || !keys.binance.secretKey) {
    return {};
  }
  try {
    return await cached("names", CACHE_TTL.coins, async () => {
      const assets = await requestBinance(
        "/sapi/v1/capital/config/getall",
        {},
        { signed: true }
      );
      return Object.fromEntries(assets.map((a) => [a.coin, a.name]));
    });
  } catch (err) {
    // names are cosmetic, so fall back to tickers rather than failing.
    // failures aren't cached, so the next request retries
    console.error(err);
    return {};
  }
};

// map of coin symbol -> { symbol, name, pair } for every coin tradable in a USD quote asset
const getCoinMap = async () => {
  const [exchangeInfo, names] = await Promise.all([
    cached("exchangeInfo", CACHE_TTL.coins, () =>
      requestBinance("/api/v3/exchangeInfo", { showPermissionSets: false })
    ),
    getAssetNames(),
  ]);

  const coins = {};
  for (const quoteAsset of QUOTE_ASSETS) {
    for (const s of exchangeInfo.symbols) {
      if (
        s.status === "TRADING" &&
        s.quoteAsset === quoteAsset &&
        !coins[s.baseAsset]
      ) {
        coins[s.baseAsset] = {
          symbol: s.baseAsset,
          name: names[s.baseAsset] || s.baseAsset,
          pair: s.symbol,
        };
      }
    }
  }
  return coins;
};

const findCoin = async (symbol) => {
  const coins = await getCoinMap();
  const coin = coins[symbol.toUpperCase()];
  if (!coin) {
    throw new Api404Error(`No market data available for ${symbol}`);
  }
  return coin;
};

const getAllCoins = async (req, res, next) => {
  try {
    const coins = await getCoinMap();
    return res.status(200).json({
      data: Object.values(coins),
      message: "List of coins successfully found",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const getCoinDetails = async (req, res, next) => {
  try {
    const coin = await findCoin(req.params.symbol);
    return res.status(200).json({
      data: coin,
      message: "Coin successfully found",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const getCoinPrice = async (req, res, next) => {
  try {
    const { pair } = await findCoin(req.params.symbol);
    const ticker = await cached(`price:${pair}`, CACHE_TTL.price, () =>
      requestBinance("/api/v3/ticker/24hr", { symbol: pair })
    );

    return res.status(200).json({
      data: {
        price: Number(ticker.lastPrice),
        open: Number(ticker.openPrice),
        high: Number(ticker.highPrice),
        low: Number(ticker.lowPrice),
        change: Number(ticker.priceChange),
        changePct: Number(ticker.priceChangePercent),
      },
      message: "Coin price successfully found",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const getCoinHistory = async (req, res, next) => {
  const { interval } = req.query;
  const limit = Number(req.query.limit);
  try {
    if (!INTERVALS.includes(interval)) {
      throw new Api400Error(`Invalid interval: ${interval}`);
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_HISTORY_LIMIT) {
      throw new Api400Error(`Invalid limit: ${req.query.limit}`);
    }

    const { pair } = await findCoin(req.params.symbol);
    const klines = await cached(
      `history:${pair}:${interval}:${limit}`,
      CACHE_TTL.history,
      () => requestBinance("/api/v3/klines", { symbol: pair, interval, limit })
    );

    // kline format: [openTime (ms), open, high, low, close, ...]
    const history = klines.map(([openTime, open, high, low, close]) => ({
      time: openTime / 1000,
      open: Number(open),
      high: Number(high),
      low: Number(low),
      close: Number(close),
    }));

    return res.status(200).json({
      data: history,
      message: "Coin history successfully found",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCoins,
  getCoinDetails,
  getCoinPrice,
  getCoinHistory,
};
