// The block in the coinUList component that lets the user add a new AltCoin

//TODO: add custom styling
//TODO: add loading indicator

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoinAction,
  selectCoinList,
} from "../../_store/reducers/coinListSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const CoinAdder = () => {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const errorMessage = useSelector(selectCoinList).error;
  const reqInProgress = useSelector(selectCoinList).reqInProgress;

  function handleBtnClick(e) {
    e.preventDefault();
    dispatch(addCoinAction(symbol));
    setSymbol("");
  }

  function renderAddButton() {
    if (reqInProgress) {
      return (
        <button
          className="btn btn-success"
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
        <button className="btn btn-success" onClick={(e) => handleBtnClick(e)}>
          Add
        </button>
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
            onChange={(e) => setSymbol(e.target.value)}
          />
          <label style={{ opacity: "0.5" }} htmlFor="addNewCoinInput">
            Altcoin Symbol, i.e. BTC, LTC...
          </label>

          {renderAddButton()}
        </div>
      </form>
      {renderAlert()}
    </div>
  );
};

export default CoinAdder;
