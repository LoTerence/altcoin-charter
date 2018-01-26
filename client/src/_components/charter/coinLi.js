// a <li> element modified to display coins: coinLi
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCoin } from '../../_store/actions/coinList';

// TODO add onclick action
// TODO add onhover action
// TODO use custom css to make it better looking

class CoinLi extends Component {

  static propTypes = {
    coin: PropTypes.object.isRequired
  }

  handleDeleteCoin() {
    this.props.deleteCoin();
  }

  render() {
    return (
      <div className="col-md-4 col-sm-6 panel panel-info">
        <span className="glyphicon glyphicon-remove pull-right" onClick={this.handleDeleteCoin.bind(this)}></span>
        <div className="panel-heading">{this.props.coin.Name}</div>
        <div className="panel-body">{this.props.coin.CoinName}</div>
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
    deleteCoin: () => dispatch(deleteCoin(ownProps.coin))
  };
};

export default connect(null, mapDispatchToProps)(CoinLi);
