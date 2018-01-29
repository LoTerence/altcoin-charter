// a <li> element modified to display coins: coinLi
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCoin, setActiveCoin } from '../../_store/actions/coinList';
import { getCoinData } from '../../_store/actions/histData';

// TODO add onclick action for changing color
// optional-TODO add onhover action
// TODO use custom css to make it better looking

class CoinLi extends Component {

  static propTypes = {
    coin: PropTypes.object.isRequired
  }

  handleDeleteCoin() {
    this.props.deleteCoin();
  }

  handleSetActiveCoin() {
    this.props.setActiveCoin();
    this.props.getCoinData();
  }

  render() {
    return (
      <div className="col-md-4 col-sm-6 panel panel-info">
        <span className="glyphicon glyphicon-remove pull-right" onClick={this.handleDeleteCoin.bind(this)}></span>
        <div onClick={this.handleSetActiveCoin.bind(this)}>
          <div className="panel-heading">{this.props.coin.Name}</div>
          <div className="panel-body">{this.props.coin.CoinName}</div>
        </div>
      </div>
    )
  }
}

/* 
const mapStateToProps = (state) => ({
  
});
*/

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    deleteCoin: () => dispatch(deleteCoin(ownProps.coin)),
    setActiveCoin: () => dispatch(setActiveCoin(ownProps.coin)),
    getCoinData: () => dispatch(getCoinData(ownProps.coin))
  };
};

export default connect(null, mapDispatchToProps)(CoinLi);
