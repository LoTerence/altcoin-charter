import { formatPriceUSD } from "./formatterUSD";

export function parseCoinDisplayData(coinDisplayData) {
  const { price, changePct, open, high, low, change } = coinDisplayData;
  return {
    currentPrice: formatPriceUSD(price),
    pctChange: changePct.toFixed(2),
    open: formatPriceUSD(open),
    high: formatPriceUSD(high),
    low: formatPriceUSD(low),
    usdChange: formatPriceUSD(change),
  };
}

export function parseHistoryIntoCoordinates(history) {
  return history.map((historicalPoint) => ({
    time: historicalPoint.time,
    price: historicalPoint.close,
  }));
}

export function parseAllCoinSymbols(allCoins) {
  return Object.values(allCoins);
}
