/* feature.js 
 *  component where the main app will live. Authenticated users can save  
 * and view data on a personal watchlist of coins here.
 */

import React, { Component } from 'react';
import WatchList from './charter/watchlist/watchList';

// TODO when component mounts, set activeCoin to empty  object or null -- might be buggy

export default class Feature extends Component {

  render() {
    return (
      <div>
        <h1>Feature</h1>
        <WatchList />
      </div>
    );
  }
}