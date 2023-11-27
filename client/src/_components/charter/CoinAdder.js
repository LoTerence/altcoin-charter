/* The block in the coinUList component that lets the user add a new AltCoin */

// TODO: add custom styling, right now its all bootstrap
// TODO: load list of symbols from DB? and use a cron to update DB once a week? or load symbols in redux?

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addNewCoin,
  selectCoinList,
  setError,
} from "../../_store/reducers/coinListSlice";
import { SpinnerIcon } from "../icons";

const CoinAdder = () => {
  const dispatch = useDispatch();
  const { coins, error } = useSelector(selectCoinList);
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

export default CoinAdder;

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
        placeholder="Altcoin Symbol, i.e. BTC, LTC..."
        type="string"
        value={value}
      />
      <label htmlFor="addNewCoinInput" style={{ opacity: "0.5" }}>
        Altcoin Symbol, i.e. BTC, LTC...
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
        <selection className="suggestions">
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
        </selection>
      )}
    </>
  );
};

const ErrorMessage = ({ error }) => {
  return <>{error && <div className="alert alert-danger">{error}</div>}</>;
};

// validates a new symbol
// @param coins: list of coins to make sure the Symbol is not already in the coinlist
const validateSymbol = (newSymbol, coins) => {
  const symbol = newSymbol.toUpperCase();
  if (symbol === "") {
    return { isValid: false, message: "Input required" };
  }
  const iChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (iChars.test(symbol)) {
    return { isValid: false, message: "No special characters allowed" };
  }
  const isListed = coins.some((c) => c.Symbol === symbol);
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
    .sort((a, b) => {
      if (a.Symbol < b.Symbol) return -1;
      if (a.Symbol > b.Symbol) return 1;
      return 0;
    })
    .slice(0, 10);
  return matches;
};
