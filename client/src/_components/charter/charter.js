/**
 * charter.js
 * container for the application
 */

import React from "react";
import CoinUList from "./CoinUList";
import PriceChart from "./priceChart";
import CoinInfo from "./coinInfo";
import TimeFrameList from "./timeFrameList";
import CoinNameInfo from "./coinNameInfo";

export default function Charter() {
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
