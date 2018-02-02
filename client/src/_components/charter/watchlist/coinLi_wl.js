// a <li> element modified to display coins: coinLi
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCoin } from '../../../_store/actions/watchList';
import { getCoinData, getHistData, setActiveCoin } from '../../../_store/actions/histData';

// optional-TODO add onclick action for changing color
// optional-TODO add onhover action

const coinLiStyle = {
  border: '1px solid #BCED91',
  borderLeft: '10px solid #BCED91',
  borderRadius: '0px',
  background: '#fafafa',
  margin: '5px',
  padding: '5px 10px',
};

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
      <div className="col-md-4 col-sm-6">
        <div style={coinLiStyle} >
        <span className="glyphicon glyphicon-remove pull-right" onClick={this.handleDeleteCoin.bind(this)}></span>
          <div onClick={this.handleSetActiveCoin.bind(this)}>
            <h4>{this.props.coin.Name}</h4>
            <p>{this.props.coin.CoinName} price history, day's change</p>
          </div>
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
