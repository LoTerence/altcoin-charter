/* coinAdder_wl.js
 * component that adds a new coin to watchlist
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addCoinWLAction,
  selectWatchList,
  coinErrWL,
} from "../../../_store/reducers/watchListSlice";
import { SpinnerIcon } from "../../icons";

const CoinAdder_wl = () => {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const coins = useSelector(selectWatchList).coins;
  const errorMessage = useSelector(selectWatchList).error;
  const reqInProgress = useSelector(selectWatchList).reqInProgress;

  useEffect(() => {
    const loadSymbols = async () => {
      const res = await axios.get(
        "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
      );
      setSymbols(Object.values(res.data.Data));
    };
    loadSymbols();
  }, []);

  const onChangeHandler = (e) => {
    setSymbol(e);
    let matches = [];
    if (e.length > 0) {
      matches = symbols.filter((sym) => {
        const regex = new RegExp(`${e}`, "gi");
        return sym.Symbol.match(regex);
      });
    }
    setSuggestions(matches);
  };

  const onSuggestHandler = (text) => {
    setSymbol(text);
    setSuggestions([]);
  };

  function handleBtnClick(e) {
    e.preventDefault();

    if (symbol === "") {
      dispatch(coinErrWL("Input required"));
      return;
    }

    const iChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (iChars.test(symbol)) {
      dispatch(coinErrWL("No special characters allowed"));
      return;
    }

    const sym = symbol.toUpperCase();

    if (coins.some((c) => c.Symbol === sym)) {
      dispatch(coinErrWL(sym + " is already in your watchlist"));
      return;
    }

    dispatch(addCoinWLAction(sym));
    setSymbol("");
    setSuggestions([]);
  }

  function renderAddButton() {
    if (reqInProgress) {
      return (
        <button
          className="btn btn-success add-button-loading"
          onClick={(e) => handleBtnClick(e)}
          disabled
        >
          <div className="w-32">
            <SpinnerIcon />
          </div>
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-success add-button"
          onClick={(e) => handleBtnClick(e)}
        >
          <div className="w-32">Add</div>
        </button>
      );
    }
  }

  function renderSuggestions() {
    if (suggestions.length > 0) {
      let suggestions_s = suggestions.sort((a, b) => {
        return a.Id - b.Id;
      });
      return (
        <div className="suggestions">
          {suggestions_s.slice(0, 10).map((suggestion) => {
            return (
              <div
                key={suggestion.Id}
                className="suggestion"
                onClick={() => onSuggestHandler(suggestion.Symbol)}
              >
                {suggestion.FullName}
              </div>
            );
          })}
        </div>
      );
    }
  }

  const renderAlert = () => {
    if (errorMessage) {
      return <div className="alert alert-danger">{errorMessage}</div>;
    }
  };

  return (
    <div className="col-md-4 col-sm-6 col-12 p-2">
      <div>Add new coin:</div>
      <form>
        <div className="form-floating d-flex">
          <input
            name="symbol"
            id="addNewCoinInput2"
            type="string"
            className="form-control form-control-sm"
            placeholder="Altcoin Symbol, i.e. BTC, LTC..."
            value={symbol}
            onChange={(e) => onChangeHandler(e.target.value)}
            autoComplete="off"
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />
          <label style={{ opacity: "0.5" }} htmlFor="addNewCoinInput2">
            Altcoin Symbol, i.e. BTC, LTC...
          </label>
          {renderAddButton()}
        </div>
        {renderSuggestions()}
      </form>

      {renderAlert()}
    </div>
  );
};

export default CoinAdder_wl;
