const GENERIC_ERROR = "Error: something went wrong, please try again later 😢";

async function getMarketData(url, notFoundMessage) {
  const res = await fetch(url);
  if (res.status === 404) {
    throw new Error(notFoundMessage);
  }
  if (!res.ok) {
    throw new Error(GENERIC_ERROR);
  }

  const body = await res.json();
  if (!body?.success || !body?.data) {
    throw new Error(GENERIC_ERROR);
  }
  return body.data;
}

export async function getCoinDisplayData({ fromSymbol }) {
  return getMarketData(
    `/api/market/price/${encodeURIComponent(fromSymbol)}`,
    "Sorry! No market data available for this coin 😢"
  );
}

export async function getCoinHistory({ fromSymbol, interval, limit }) {
  return getMarketData(
    `/api/market/history/${encodeURIComponent(
      fromSymbol
    )}?interval=${interval}&limit=${limit}`,
    "Sorry! No market data available for this coin 😢"
  );
}

export async function getAllCoins() {
  return getMarketData(
    "/api/market/coins",
    "Error: failed to fetch coins, please try again later"
  );
}

export async function getCoinDetails({ fromSymbol }) {
  return getMarketData(
    `/api/market/coins/${encodeURIComponent(fromSymbol)}`,
    "That coin is not available on Binance.US"
  );
}
