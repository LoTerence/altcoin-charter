/* watchList.js
 *  Component that shows an unordered list of coins from the authenticated user's
 * personal watchlist
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoins } from '../../../_store/actions/watchList';
import CoinLi from './coinLi_wl';
import CoinAdder from './coinAdder_wl';

// TODO create watchlist coinLi

class WatchList extends Component {
  static propTypes = {
    getCoins: PropTypes.func.isRequired,
    coins: PropTypes.array.isRequired
  }

  static defaultProps = {
    coins: []
  } 

  componentWillMount() {
    this.props.getCoins();
  }

  render() {
    return (
      <div>
        <p>hello</p>

        {this.props.coins.map(coin =>
          <CoinLi key={coin.Id} coin={coin} />
        )}

        <CoinAdder />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.watchList.coins
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCoins: () => dispatch(getCoins())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
