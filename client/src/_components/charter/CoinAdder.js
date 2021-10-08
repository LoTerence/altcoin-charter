// The block in the coinUList component that lets the user add a new AltCoin

//TODO: add custom styling

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addCoinAction,
  selectCoinList,
} from "../../_store/reducers/coinListSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const CoinAdder = () => {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const errorMessage = useSelector(selectCoinList).error;
  const reqInProgress = useSelector(selectCoinList).reqInProgress;

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
    dispatch(addCoinAction(symbol));
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
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="fa-spin"
            style={{ width: "37px" }}
          />
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-success add-button"
          onClick={(e) => handleBtnClick(e)}
        >
          Add
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

  function renderAlert() {
    if (errorMessage) {
      return <div className="alert alert-danger">{errorMessage}</div>;
    }
  }

  return (
    <div className="col-md-4 col-sm-6 col-12 p-2">
      <label>Add new coin:</label>
      <form>
        <div className="form-floating d-flex">
          <input
            name="symbol"
            id="addNewCoinInput"
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
          <label style={{ opacity: "0.5" }} htmlFor="addNewCoinInput">
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

export default CoinAdder;
