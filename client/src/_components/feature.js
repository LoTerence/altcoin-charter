/* feature.js
 *  component where the main app will live. Authenticated users can save
 * and view data on a personal watchlist of coins here.
 */

import React, { Component } from "react";
import WatchList from "./charter/watchlist/watchList";
import PriceChart from "./charter/priceChart";
import CoinInfo from "./charter/CoinInfo";
import TimeFrameList from "./charter/TimeFrameList";
import CoinNameInfo from "./charter/CoinNameInfo";

export default class Feature extends Component {
  render() {
    return (
      <div>
        <CoinNameInfo></CoinNameInfo>
        <TimeFrameList />
        <PriceChart />
        <CoinInfo />
        <WatchList />
      </div>
    );
  }
}
