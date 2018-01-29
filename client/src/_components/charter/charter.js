import React, { Component } from 'react';
import CoinUList from './coinUList';
import PriceChart from './priceChart';
import CoinInfo from './coinInfo';

// Charter will be the container for the charter app
export class Charter extends Component {

  render() {
    return (
      <div>
        <div>
          <h1>Chart</h1>
          <p>create buttons here for selecting a time period (day, week, month, 3months, year)</p>
          <PriceChart />
          <br/>
          <br/>
          <CoinInfo />
        </div>
        <br/>
        <br/>
        <br/>
        <CoinUList />

      </div>
    )
  }
}

export default Charter;
