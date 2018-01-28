import React, { Component } from 'react';
import CoinUList from './coinUList';
import PriceChart from './priceChart';

// Charter will be the container for the charter app
export class Charter extends Component {

  render() {
    return (
      <div>
        <div>
          <h1>Chart</h1>
          <p>create buttons here for selecting a time period (day, week, month, 3months, year)</p>
          <PriceChart />
          <p>create a component here for displaying data for the coin's day change info </p>
        </div>
        <br/>
        <CoinUList />

      </div>
    )
  }
}

export default Charter;
