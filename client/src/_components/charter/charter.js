/**
 * charter.js
 * container for the application
 */

import React, { Component } from "react";
import CoinUList from "./CoinUList";
import PriceChart from "./priceChart";
import CoinInfo from "./coinInfo";
import TimeFrameList from "./timeFrameList";
import CoinNameInfo from "./coinNameInfo";

class Charter extends Component {
  render() {
    return (
      <div>
        <CoinNameInfo></CoinNameInfo>
        <TimeFrameList />
        <PriceChart />
        <CoinInfo />
        <CoinUList />
      </div>
    );
  }
}

export default Charter;
