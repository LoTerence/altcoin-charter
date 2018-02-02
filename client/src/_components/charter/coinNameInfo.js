// Component that displays the name and symbol of the active COIN
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class CoinNameInfo extends Component {
  static propTypes = {
    activeCoin: PropTypes.object,
    activeTimeframe: PropTypes.string
  }

  render() {
    if (!this.props.activeCoin || !this.props.activeCoin.Name) {
      return <h1>Chart</h1>;
    }
    return <h1>{this.props.activeCoin.CoinName} - {this.props.activeCoin.Symbol} - {this.props.activeTimeframe}</h1>;
  }
}

const mapStateToProps = (state) => ({
    activeCoin: state.histData.activeCoin,
    activeTimeframe: state.histData.activeTimeframe
})

export default connect(mapStateToProps)(CoinNameInfo)
