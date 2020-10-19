/**
 * charter.js
 * container for the application
 */

import React from "react";
import CoinUList from "./CoinUList";
import PriceChart from "./priceChart";
import CoinInfo from "./CoinInfo";
import TimeFrameList from "./TimeFrameList";
import CoinNameInfo from "./CoinNameInfo";

export default function Charter() {
  return (
    <div>
      <CoinNameInfo />
      <TimeFrameList />
      <PriceChart />
      <CoinInfo />
      <CoinUList />
    </div>
  );
}
