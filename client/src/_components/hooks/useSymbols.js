import { useEffect, useState } from "react";
import { getAllCoins } from "../../lib/cryptocompareAPI";
import { parseAllCoinSymbols } from "../../lib/transformers";

// Requirements:
// 1. should store the state of the symbols list in cache, instead of keeping it in redux global state
//   - this is because only CoinAdder uses this list.

// 2. should fetch symbols only when the component initializes.
// 3. should return symbols state
export default function useSymbols() {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function fetchSymbols() {
      const allCoins = await getAllCoins();
      if (!ignore) {
        const allCoinSymbols = parseAllCoinSymbols(allCoins);
        setSymbols(allCoinSymbols);
      }
    }

    fetchSymbols();

    return () => {
      ignore = true;
    };
  }, []);

  return symbols;
}
