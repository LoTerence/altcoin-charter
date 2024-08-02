export function parseCoinDisplayData(coinDisplayData) {
  const {
    PRICE,
    CHANGEPCT24HOUR,
    OPEN24HOUR,
    HIGH24HOUR,
    LOW24HOUR,
    CHANGE24HOUR,
  } = coinDisplayData;
  return {
    currentPrice: PRICE,
    pctChange: CHANGEPCT24HOUR,
    open: OPEN24HOUR,
    high: HIGH24HOUR,
    low: LOW24HOUR,
    usdChange: CHANGE24HOUR,
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
