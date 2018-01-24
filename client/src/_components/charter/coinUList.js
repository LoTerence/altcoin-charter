// Component for the unordered list of coins: CoinUList

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoins } from '../../_store/actions/coinList'; 
import CoinLi from './coinLi';

// TODO: add addCoin action

class CoinUList extends Component {

  static propTypes = {
    getCoins: PropTypes.func.isRequired,
    coins: PropTypes.array.isRequired           //an array of coin objects
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
        {this.props.coins.map(coin =>
          <CoinLi key={coin.Id} coin={coin} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    coins: state.coinList.coins
});

const mapDispatchToProps = (dispatch) => {
  return{
    getCoins: () => dispatch(getCoins())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinUList);
