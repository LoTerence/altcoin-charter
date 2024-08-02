export async function getCoinDailyAverageData({ fromSymbol }) {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/generateAvg?fsym=${fromSymbol}&tsym=USD&e=Kraken`
  );
  if (!res.ok) {
    throw new Error("Error: something went wrong, please try again later 😢");
  }

  const data = await res.json();
  if ((data?.Response && data.Response === "Error") || !data?.DISPLAY) {
    throw new Error("Sorry! No market data available for this coin 😢");
  }

  return data;
}

export async function getCoinHistory({ fromSymbol, timeUnit, limit }) {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/${timeUnit}?fsym=${fromSymbol}&tsym=USD&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Error: something went wrong, please try again later 😢");
  }

  const data = await res.json();
  if (data?.Response !== "Success" || !data?.Data) {
    throw new Error("Sorry! No market data available for this coin 😢");
  }
  return data;
}
