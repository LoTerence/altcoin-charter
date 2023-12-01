/* coinAdder_wl.js
 * component that adds a new coin to watchlist
 */

// TODO: refactor so this is not a different component than CoinAdder

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
  const { coins, error } = useSelector(selectWatchList);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
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

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSymbol(text);
    const matches = deriveSuggestions(text, symbols);
    setSuggestions(matches);
  };

  const handleSuggestClick = (e) => {
    e.stopPropagation();
    const symbol = e.target.getAttribute("value");
    setSymbol(symbol);
    setSuggestions([]);
  };

  const handleAddButtonClick = async (e) => {
    e.preventDefault();
    const newSymbol = symbol.toUpperCase();
    const validation = validateSymbol(newSymbol, coins);
    if (!validation.isValid) {
      dispatch(setError(validation.message));
      return;
    }
    try {
      setAddRequestStatus("pending");
      await dispatch(addNewCoin(newSymbol)).unwrap();
      setSymbol("");
    } catch (err) {
      console.error("Failed to save the coin: ", err);
      dispatch(setError("Error posting new coin"));
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  return (
    <div className="col-md-4 col-sm-6 col-12 p-2">
      <div>Add new coin:</div>
      <form>
        <div className="form-floating d-flex">
          <SymbolInput
            disabled={addRequestStatus === "pending"}
            onBlur={handleBlur}
            onChange={handleInputChange}
            value={symbol}
          />
          <AddButton
            isLoading={addRequestStatus === "pending"}
            onClick={handleAddButtonClick}
          />
        </div>
        <SuggestionsDropdown
          suggestions={suggestions}
          onClick={handleSuggestClick}
        />
      </form>
      <ErrorMessage error={error} />
    </div>
  );
};

export default CoinAdder_wl;

const SymbolInput = ({ disabled, onBlur, onChange, value }) => {
  return (
    <>
      <input
        autoComplete="off"
        className="form-control form-control-sm"
        disabled={disabled}
        id="addNewCoinInput"
        name="symbol"
        onBlur={onBlur}
        onChange={(e) => onChange(e)}
        placeholder="Altcoin symbol, i.e. BTC, LTC..."
        type="string"
        value={value}
      />
      <label htmlFor="addNewCoinInput" style={{ opacity: "0.5" }}>
        Altcoin symbol, i.e. BTC, LTC...
      </label>
    </>
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
              className="suggestion"
              key={s.Id}
              onClick={(e) => onClick(e)}
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

const ErrorMessage = ({ error }) => {
  return <>{error && <div className="alert alert-danger">{error}</div>}</>;
};

// validates a new symbol
// @param coins: list of coins to make sure the symbol is not already in the coinlist
const validateSymbol = (newSymbol, coins) => {
  const symbol = newSymbol.toUpperCase();
  if (symbol === "") {
    return { isValid: false, message: "Input required" };
  }
  const iChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (iChars.test(symbol)) {
    return { isValid: false, message: "No special characters allowed" };
  }
  const isListed = coins.some((c) => c.symbol === symbol);
  if (isListed) {
    return {
      isValid: false,
      message: `${symbol} is already in the list of coins`,
    };
  }
  return { isValid: true };
};

const deriveSuggestions = (text, symbols) => {
  if (text.length === 0) return [];
  const regex = new RegExp(`^${text}`, "gi");
  const matches = symbols
    .filter((s) => s.Symbol.match(regex))
    .sort((a, b) => a.Symbol.localeCompare(b.Symbol))
    .slice(0, 10);
  return matches;
};
