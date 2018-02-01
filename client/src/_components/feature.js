/* feature.js 
 *  component where the main app will live. Authenticated users can save  
 * and view data on a personal watchlist of coins here.
 */

import React, { Component } from 'react';
import WatchList from './charter/watchlist/watchList';
import PriceChart from './charter/priceChart';
import CoinInfo from './charter/coinInfo';
import TimeFrameList from './charter/timeFrameList';
import CoinNameInfo from './charter/coinNameInfo';

// TODO when component mounts, set activeCoin to empty  object or null -- might be buggy

export default class Feature extends Component {

  render() {
    return (
      <div>
        <CoinNameInfo></CoinNameInfo>
        <TimeFrameList />
        <PriceChart />
        <br/>
        <CoinInfo />
        <br/>
        <WatchList />
      </div>
    );
  }
}