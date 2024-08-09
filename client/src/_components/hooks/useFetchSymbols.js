import { useEffect, useState } from "react";
import { getAllCoins } from "../../lib/cryptocompareAPI";
import { parseAllCoinSymbols } from "../../lib/transformers";

export default function useFetchSymbols() {
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
