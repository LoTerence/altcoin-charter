// a <li> element modified to display coins: coinLi
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCoin } from '../../_store/actions/coinList';
import { getCoinData, getHistData, setActiveCoin } from '../../_store/actions/histData';

// TODO add onclick action for changing color
// optional-TODO add onhover action
// TODO use custom css to make it better looking

class CoinLi extends Component {

  static propTypes = {
    coin: PropTypes.object.isRequired,
    activeTimeframe: PropTypes.string.isRequired
  }

  handleDeleteCoin() {
    this.props.deleteCoin();
  }

  handleSetActiveCoin() {
    this.props.setActiveCoin();
    this.props.getCoinData();
    this.props.getHistData(this.props.activeTimeframe);
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


const mapStateToProps = (state) => ({
  activeTimeframe: state.histData.activeTimeframe
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    deleteCoin: () => dispatch(deleteCoin(ownProps.coin)),
    setActiveCoin: () => dispatch(setActiveCoin(ownProps.coin)),
    getCoinData: () => dispatch(getCoinData(ownProps.coin)),
    getHistData: (tf) => dispatch(getHistData(ownProps.coin, tf))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinLi);
