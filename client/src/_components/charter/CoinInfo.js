/* 
coinInfo.js 
component that will display the active coin's day's data including current price, 
    day's %change, day's open, high, low, incremental change, market cap, and supply

    TODO: add twitter button?
*/

import React from "react";
import { useSelector } from "react-redux";
import { selectHistData } from "../../_store/reducers/histDataSlice";

const infoStyle = {
  border: "1px solid gold",
  borderRadius: "0px",
  background: "#fafafa",
  margin: "10px",
  padding: "10px 10px",
};

const CoinInfo = () => {
  const activeCoin = useSelector(selectHistData).activeCoin;
  const coinData = useSelector(selectHistData).coinData;

  if (!activeCoin || !coinData || !activeCoin.Name) {
    return (
      <div className="alert alert-warning">
        Select a coin from the list below to see its data
      </div>
    );
  }

  return (
    <div className="container" style={infoStyle}>
      <p>{activeCoin.CoinName}'s current Price:</p>
      <div className="col-md-4">
        <h1>{coinData.currentPrice}</h1>
        <p>{coinData.pctChange}% change today</p>
      </div>
      <div className="col-md-4">
        <p>Today's Open: {coinData.open}</p>
        <p>Change: {coinData.usdChange}</p>
      </div>
      <div className="col-md-4">
        <p>Today's High: {coinData.high}</p>
        <p>Today's Low: {coinData.low}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
