import React, { Component } from 'react';
import CoinUList from './coinUList';

// Charter will be the container for the charter app
export class Charter extends Component {

  render() {
    return (
      <div>
        <div>
          <h1>Chart</h1>
          <p>create a component here where the chart and data displays here in this div</p>
        </div>
        
        <CoinUList />

      </div>
    )
  }
}

export default Charter;
