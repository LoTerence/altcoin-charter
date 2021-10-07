/* 
coinInfo.js 
component that will display the active coin's day's data including current price, 
    day's %change, day's open, high, low, incremental change, market cap, and supply

    TODO: add twitter button?
*/

import React from "react";
import { useSelector } from "react-redux";
import { selectHistData } from "../../_store/reducers/histDataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const infoStyle = {
  border: "1px solid gold",
  borderRadius: "0px",
  background: "#fafafa",
  margin: ".5rem 0",
  padding: "10px 10px",
  position: "relative",
};

const CoinInfo = () => {
  const activeCoin = useSelector(selectHistData).activeCoin;
  const coinData = useSelector(selectHistData).coinData;
  const fetchHistInProgress = useSelector(selectHistData).fetchHistInProgress;
  const fetchCoinInProgress = useSelector(selectHistData).fetchCoinInProgress;

  if (!activeCoin || !coinData || !activeCoin.Name) {
    return (
      <div className="alert alert-warning">
        {renderLoading()}
        Select a coin from the list below to see its data
      </div>
    );
  }

  function renderLoading() {
    if (fetchHistInProgress || fetchCoinInProgress) {
      return (
        <div className="coin-info-loading">
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="fa-spin fa-3x"
            // style={{ width: "2rem" }}
          />
        </div>
      );
    }
  }

  return (
    <div
      className="d-flex flex-column flex-md-row justify-content-evenly align-items-start align-items-md-center flex-wrap"
      style={infoStyle}
    >
      {renderLoading()}
      <div className="p-2 flex-fill">
        <p>{activeCoin.CoinName}'s current Price:</p>
        <h1>{coinData.currentPrice}</h1>
        <p>{coinData.pctChange}% change today</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today's Open: {coinData.open}</p>
        <p>Change: {coinData.usdChange}</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today's High: {coinData.high}</p>
        <p>Today's Low: {coinData.low}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
