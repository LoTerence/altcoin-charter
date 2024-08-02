export async function getCoinDisplayData({ fromSymbol }) {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/generateAvg?fsym=${fromSymbol}&tsym=USD&e=CCCAGG`
  );
  if (!res.ok) {
    throw new Error("Error: something went wrong, please try again later 😢");
  }

  const body = await res.json();
  if ((body?.Response && body.Response === "Error") || !body?.DISPLAY) {
    throw new Error("Sorry! No market data available for this coin 😢");
  }

  return body.DISPLAY;
}

export async function getCoinHistory({ fromSymbol, timeUnit, limit }) {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/${timeUnit}?fsym=${fromSymbol}&tsym=USD&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Error: something went wrong, please try again later 😢");
  }

  const body = await res.json();
  if (body?.Response !== "Success" || !body?.Data) {
    throw new Error("Sorry! No market data available for this coin 😢");
  }
  return body.Data;
}
