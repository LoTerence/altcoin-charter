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
import { getProfile } from '../../../_store/actions/auth';

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
    this.props.getProfile();
  }

  render() {
    return (
      <div>
        <p><b>{this.props.profile}</b></p>
        <p>Your personal watchlist of coins: Coins you add to this list will be saved to your account</p>
        {this.props.coins.map(coin =>
          <CoinLi key={coin.Id} coin={coin} />
        )}
        <CoinAdder />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.watchList.coins,
  profile: state.auth.message
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCoins: () => dispatch(getCoins()),
    getProfile: () => dispatch(getProfile())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
