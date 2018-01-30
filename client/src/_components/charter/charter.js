import React, { Component } from 'react';
import CoinUList from './coinUList';
import PriceChart from './priceChart';
import CoinInfo from './coinInfo';
import TimeFrameList from './timeFrameList';
import CoinNameInfo from './coinNameInfo';

// Charter will be the container for the charter app
export class Charter extends Component {

  render() {
    return (
      <div>
        <div>
          <CoinNameInfo></CoinNameInfo>
          <TimeFrameList />
          <PriceChart />
          <br/>
          <br/>
          <CoinInfo />
        </div>
        <br/>
        <CoinUList />
        <br/>
      </div>
    )
  }
}

export default Charter;
