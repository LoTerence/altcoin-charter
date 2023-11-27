/* coinAdder_wl.js
 * component that adds a new coin to watchlist
 */

// TODO: refactor so this is not a different component than CoinAdder..
// they both use a lot of the same logic, the only difference is the redux slice

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addNewCoin,
  selectWatchList,
  setError,
} from "../../../_store/reducers/watchListSlice";
import { SpinnerIcon } from "../../icons";

const CoinAdder_wl = () => {
  const dispatch = useDispatch();
  const { coins, error, reqInProgress } = useSelector(selectWatchList);
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadSymbols = async () => {
      const res = await axios.get(
        "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
      );
      const initialSymbols = Object.values(res.data.Data);
      setSymbols(initialSymbols);
    };
    loadSymbols();
  }, []);

  const onChangeHandler = (e) => {
    const text = e.target.value;
    setSymbol(text);
    let matches = [];
    if (text.length > 0) {
      matches = symbols
        .filter((sym) => {
          const regex = new RegExp(`${text}`, "gi");
          return sym.Symbol.match(regex);
        })
        .sort((a, b) => {
          if (a.Symbol < b.Symbol) return -1;
          if (a.Symbol > b.Symbol) return 1;
          return 0;
        })
        .slice(0, 10);
    }
    setSuggestions(matches);
  };

  const onSuggestClick = (e) => {
    e.stopPropagation();
    const symbol = e.target.getAttribute("value");
    setSymbol(symbol);
    setSuggestions([]);
  };

  const onAddButtonClick = (e) => {
    e.preventDefault();

    if (symbol === "") {
      dispatch(setError("Input required"));
      return;
    }

    const iChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (iChars.test(symbol)) {
      dispatch(setError("No special characters allowed"));
      return;
    }

    const sym = symbol.toUpperCase();

    if (coins.some((c) => c.Symbol === sym)) {
      dispatch(setError(sym + " is already in your watchlist"));
      return;
    }

    dispatch(addNewCoin(sym));
    setSymbol("");
    setSuggestions([]);
  };

  return (
    <div className="col-md-4 col-sm-6 col-12 p-2">
      <div>Add new coin:</div>
      <form>
        <div className="form-floating d-flex">
          <input
            autoComplete="off"
            className="form-control form-control-sm"
            id="addNewCoinInput"
            name="symbol"
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Altcoin Symbol, i.e. BTC, LTC..."
            type="string"
            value={symbol}
          />
          <label htmlFor="addNewCoinInput" style={{ opacity: "0.5" }}>
            Altcoin Symbol, i.e. BTC, LTC...
          </label>
          <AddButton isLoading={reqInProgress} onClick={onAddButtonClick} />
        </div>
        <SuggestionsDropdown
          suggestions={suggestions}
          onClick={onSuggestClick}
        />
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

const AddButton = ({ isLoading, onClick }) => {
  return (
    <>
      {isLoading ? (
        <button
          className="btn btn-success add-button-loading"
          disabled
          type="button"
        >
          <div className="w-32">
            <SpinnerIcon />
          </div>
        </button>
      ) : (
        <button className="btn btn-success add-button" onClick={onClick}>
          <div className="w-32">Add</div>
        </button>
      )}
    </>
  );
};

const SuggestionsDropdown = ({ suggestions, onClick }) => {
  return (
    <>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((s) => (
            <option
              key={s.Id}
              className="suggestion"
              onClick={() => onClick(s.Symbol)}
              value={s.Symbol}
            >
              {s.FullName}
            </option>
          ))}
        </div>
      )}
    </>
  );
};

export default CoinAdder_wl;
