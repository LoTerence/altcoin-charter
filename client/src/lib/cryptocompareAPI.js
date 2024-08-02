export async function getCoinDailyAverageData(coinSymbol) {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/generateAvg?fsym=${coinSymbol}&tsym=USD&e=Kraken`
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

export async function getCoinHistory({ coinSymbol, timeUnit, limit }) {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/${timeUnit}?fsym=${coinSymbol}&tsym=USD&limit=${limit}`
  );
  if (!res.ok) {
    console.log("!res.ok");
    throw new Error("Error: something went wrong, please try again later 😢");
  }

  const data = await res.json();
  if (data?.Response !== "Success" || !data?.Data) {
    console.log('data?.Response !== "Success" || !data?.Data');
    throw new Error("Sorry! No market data available for this coin 😢");
  }
  return data;
}
