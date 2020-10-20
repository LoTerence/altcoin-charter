// The block in the coinUList component that lets the user add a new AltCoin

//TODO: add custom styling
//TODO: add loading indicator

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoinAction,
  selectCoinList,
} from "../../_store/reducers/coinListSlice";

const CoinAdder = () => {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const errorMessage = useSelector(selectCoinList).error;

  function handleBtnClick(e) {
    e.preventDefault();
    dispatch(addCoinAction(symbol));
    setSymbol("");
  }

  function renderAlert() {
    if (errorMessage) {
      return <div className="alert alert-danger">{errorMessage}</div>;
    }
  }

  return (
    <div className="col-md-4 col-sm-6">
      <label>Add a new coin to the list</label>
      <form>
        <fieldset className="input-group">
          <input
            name="symbol"
            type="string"
            className="form-control"
            placeholder="Altcoin Symbol, i.e. BTC, LTC..."
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <span>
            <button
              className="btn btn-success"
              onClick={(e) => handleBtnClick(e)}
            >
              Add
            </button>
          </span>
        </fieldset>
      </form>
      {renderAlert()}
    </div>
  );
};

export default CoinAdder;
