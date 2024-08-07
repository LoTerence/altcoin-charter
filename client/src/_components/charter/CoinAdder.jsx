/*
 * The block that lets the user add a new AltCoin
 */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SpinnerIcon } from "../icons";
import useFetchSymbols from "../hooks/useFetchSymbols";

const CoinAdder = ({ addNewCoin, coins, error, setError }) => {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [symbol, setSymbol] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const isLoading = addRequestStatus === "pending";
  const symbols = useFetchSymbols();

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
    setSuggestions([]);
    const newSymbol = symbol.toUpperCase();
    try {
      validateSymbol(newSymbol, coins);
      setAddRequestStatus("pending");
      await dispatch(addNewCoin(newSymbol)).unwrap();
      setSymbol("");
    } catch (err) {
      dispatch(setError(err?.message || "Error: failed to save new coin"));
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
            disabled={isLoading}
            onBlur={handleBlur}
            onChange={handleInputChange}
            value={symbol}
          />
          <AddButton isLoading={isLoading} onClick={handleAddButtonClick} />
        </div>
        <SuggestionsDropdown
          suggestions={suggestions}
          onClick={handleSuggestClick}
        />
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
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
        placeholder="Altcoin symbol, i.e. BTC, LTC..."
        type="string"
        value={value}
      />
      <label className="opacity-50" htmlFor="addNewCoinInput">
        Altcoin symbol, i.e. BTC, LTC...
      </label>
    </>
  );
};

const AddButton = ({ isLoading, onClick }) => {
  return (
    <button
      className="btn btn-success add-button"
      disabled={isLoading}
      type="button"
      onClick={onClick}
    >
      <div className="w-32">{isLoading ? <SpinnerIcon /> : "Add"}</div>
    </button>
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

// @param coins: list of coins to make sure the symbol is not already in the coinlist
const validateSymbol = (symbol, coins) => {
  if (symbol === "") throw new Error("Input required");

  const iChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (iChars.test(symbol)) throw new Error("No special characters allowed");

  const isListed = coins.some((c) => c.symbol === symbol);
  if (isListed) throw new Error(`${symbol} is already in the list of coins`);

  return true;
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
