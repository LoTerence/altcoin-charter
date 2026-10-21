/**
 * @module controllers/market
 * @description Controllers for cryptocurrency market data, sourced from the Binance.US API.
 *
 * Exposes Express handlers for listing tradable coins and for fetching a
 * coin's details, 24-hour price summary, and OHLC price history. Binance
 * responses are normalized to plain numbers/objects, cached in memory (see
 * `cached`), and USD pairs are preferred over USDT pairs where both exist.
 * Errors are forwarded to Express error-handling middleware via `next(err)`,
 * except for asset-name lookups, which degrade gracefully (see
 * `getAssetNames`).
 *
 * @typedef {Object} Coin
 * @property {string} symbol - Base asset ticker, e.g. `"BTC"`.
 * @property {string} name - Full asset name, e.g. `"Bitcoin"`, or the ticker
 *   when no full name is available.
 * @property {string} pair - Binance trading pair, e.g. `"BTCUSD"`.
 *
 * @typedef {Object} CoinPrice
 * @property {number} price - Last traded price.
 * @property {number} open - Price 24 hours ago.
 * @property {number} high - Highest price in the last 24 hours.
 * @property {number} low - Lowest price in the last 24 hours.
 * @property {number} change - Absolute price change over the last 24 hours.
 * @property {number} changePct - Percentage price change over the last 24 hours.
 *
 * @typedef {Object} HistoryPoint
 * @property {number} time - Candle open time, in seconds since the Unix epoch.
 * @property {number} open - Opening price for the interval.
 * @property {number} high - Highest price during the interval.
 * @property {number} low - Lowest price during the interval.
 * @property {number} close - Closing price for the interval.
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

/**
 * Runs `load` at most once per `ttl` ms for a given `key`, sharing concurrent calls.
 *
 * Returns the cached value while it is fresh; on a miss or expiry, concurrent
 * callers share a single in-flight `load()` promise instead of each triggering
 * their own. Only successful loads are cached, so a failed load is retried by
 * the next caller.
 *
 * @template T
 * @param {string} key - Cache key identifying the value.
 * @param {number} ttl - How long a loaded value stays fresh, in milliseconds.
 * @param {() => Promise<T>} load - Loader invoked on a cache miss or expiry.
 * @returns {Promise<T>} The cached or newly loaded value.
 */
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

/**
 * Performs a request against the Binance.US API and returns the parsed JSON body.
 *
 * When `signed` is true, a `timestamp` is added to the query, the query string
 * is HMAC-SHA256-signed with the configured Binance secret key, and the API key
 * is sent in the `X-MBX-APIKEY` header, as required by Binance's signed
 * (account) endpoints. Unsigned requests are used for public market data.
 *
 * @param {string} path - Binance API path, e.g. `"/api/v3/ticker/24hr"`.
 * @param {Object<string, string|number|boolean>} [params={}] - Query parameters.
 * @param {Object} [options] - Request options.
 * @param {boolean} [options.signed=false] - Whether to sign the request.
 * @returns {Promise<*>} The parsed JSON response body.
 * @throws {Error} If Binance responds with a non-2xx status; the message
 *   includes the path, HTTP status, and Binance's `msg` field when present.
 */
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

/**
 * Fetches the full name of every asset (e.g. BTC -> Bitcoin).
 *
 * Full asset names are only available from a signed Binance endpoint
 * (`/sapi/v1/capital/config/getall`), so this requires Binance API credentials.
 * Names are cosmetic: when credentials are missing or the request fails, this
 * resolves to an empty map and callers fall back to ticker symbols rather than
 * failing. Successful results are cached for `CACHE_TTL.coins`; failures are
 * not cached, so the next call retries.
 *
 * @returns {Promise<Object<string, string>>} Map of asset ticker to full name,
 *   or an empty object when names are unavailable.
 */
const getAssetNames = async () => {
  if (!keys.binance.apiKey || !keys.binance.secretKey) {
    return {};
  }
  try {
    return await cached("names", CACHE_TTL.coins, async () => {
      const assets = await requestBinance(
        "/sapi/v1/capital/config/getall",
        {},
        { signed: true },
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

/**
 * Builds the map of every coin tradable against a USD or USDT quote asset.
 *
 * Fetches Binance exchange info and full asset names in parallel (both cached
 * for `CACHE_TTL.coins`), keeps only symbols with `TRADING` status, and prefers
 * a `USD` pair over a `USDT` pair when a coin trades against both. Each coin's
 * `name` falls back to its ticker when no full name is available.
 *
 * @returns {Promise<Object<string, Coin>>} Map of base asset symbol (e.g.
 *   `"BTC"`) to its {@link Coin} entry.
 * @throws {Error} If the Binance exchange-info request fails.
 */
const getCoinMap = async () => {
  const [exchangeInfo, names] = await Promise.all([
    cached("exchangeInfo", CACHE_TTL.coins, () =>
      requestBinance("/api/v3/exchangeInfo", { showPermissionSets: false }),
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

/**
 * Resolves a coin symbol to its {@link Coin} entry, case-insensitively.
 *
 * @param {string} symbol - Base asset ticker, e.g. `"BTC"` or `"btc"`.
 * @returns {Promise<Coin>} The resolved coin.
 * @throws {Api404Error} If the symbol has no tradable USD/USDT pair.
 * @throws {Error} If the underlying Binance exchange-info request fails.
 */
const findCoin = async (symbol) => {
  const coins = await getCoinMap();
  const coin = coins[symbol.toUpperCase()];
  if (!coin) {
    throw new Api404Error(`No market data available for ${symbol}`);
  }
  return coin;
};

/**
 * Express handler for `GET /market/coins`.
 *
 * Responds with `200` and `{ data: Coin[], message, success: true }` listing
 * every coin tradable against USD/USDT. Errors are forwarded to `next`.
 *
 * @param {import("express").Request} req - Express request (unused).
 * @param {import("express").Response} res - Express response.
 * @param {import("express").NextFunction} next - Forwards errors to Express
 *   error-handling middleware.
 * @returns {Promise<void>}
 */
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

/**
 * Express handler for `GET /market/coins/:symbol`.
 *
 * Responds with `200` and `{ data: Coin, message, success: true }` for the
 * requested coin. An unknown symbol produces an `Api404Error`, forwarded to
 * `next`.
 *
 * @param {import("express").Request} req - Express request; `req.params.symbol`
 *   is the base asset ticker (case-insensitive).
 * @param {import("express").Response} res - Express response.
 * @param {import("express").NextFunction} next - Forwards errors to Express
 *   error-handling middleware.
 * @returns {Promise<void>}
 */
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

/**
 * Express handler for `GET /market/price/:symbol`.
 *
 * Fetches the pair's 24-hour ticker from Binance (cached per pair for
 * `CACHE_TTL.price`), converts Binance's string fields to numbers, and responds
 * with `200` and `{ data: CoinPrice, message, success: true }`. An unknown
 * symbol produces an `Api404Error`, forwarded to `next`; Binance failures are
 * likewise forwarded.
 *
 * @param {import("express").Request} req - Express request; `req.params.symbol`
 *   is the base asset ticker (case-insensitive).
 * @param {import("express").Response} res - Express response.
 * @param {import("express").NextFunction} next - Forwards errors to Express
 *   error-handling middleware.
 * @returns {Promise<void>}
 */
const getCoinPrice = async (req, res, next) => {
  try {
    const { pair } = await findCoin(req.params.symbol);
    const ticker = await cached(`price:${pair}`, CACHE_TTL.price, () =>
      requestBinance("/api/v3/ticker/24hr", { symbol: pair }),
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

/**
 * Express handler for `GET /market/history/:symbol?interval=<interval>&limit=<limit>`.
 *
 * Validates `interval` against `INTERVALS` (`1m`, `5m`, `15m`, `1h`, `4h`,
 * `1d`) and `limit` as an integer between 1 and `MAX_HISTORY_LIMIT` (1000),
 * then fetches klines (candlesticks) from Binance, cached per
 * pair/interval/limit for `CACHE_TTL.history`. Each Binance kline array
 * (`[openTime (ms), open, high, low, close, ...]`) is mapped to a
 * {@link HistoryPoint} with `time` converted to seconds and prices converted
 * to numbers. Responds with `200` and
 * `{ data: HistoryPoint[], message, success: true }`.
 *
 * Invalid `interval`/`limit` values produce an `Api400Error` and an unknown
 * symbol an `Api404Error`; all errors are forwarded to `next`.
 *
 * @param {import("express").Request} req - Express request; `req.params.symbol`
 *   is the base asset ticker (case-insensitive), `req.query.interval` the
 *   candle interval, and `req.query.limit` the number of candles.
 * @param {import("express").Response} res - Express response.
 * @param {import("express").NextFunction} next - Forwards errors to Express
 *   error-handling middleware.
 * @returns {Promise<void>}
 */
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
      () => requestBinance("/api/v3/klines", { symbol: pair, interval, limit }),
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
