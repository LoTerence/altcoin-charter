// a <li> element modified to display coins: coinLi
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

// TODO add onclick action
// TODO add onhover action
// TODO add 'x' on top right corner and remover action
// TODO use custom css to make it better looking

class CoinLi extends Component {
  static propTypes = {
    coin: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="col-md-4 col-sm-6 panel panel-info">
        <div className="panel-heading">{this.props.coin.Name}</div>
        <div className="panel-body">{this.props.coin.CoinName}</div>
      </div>
    )
  }
}

/*  //probably wont need this
const mapStateToProps = (state) => ({
  
});
*/

/*
const mapDispatchToProps = {
  
};
*/

//export default connect(null, mapDispatchToProps)(CoinLi);
export default CoinLi;