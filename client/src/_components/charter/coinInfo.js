/* 
coinInfo.js 
component that will display the active coin's day's data including current price, 
    day's %change, day's open, high, low, incremental change, market cap, and supply

    TODO: add twitter button?
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const infoStyle = {
    border: '1px solid gold',
    borderRadius: '0px',
    background: '#fafafa',
    margin: '10px',
    padding: '10px 10px',
}

class CoinInfo extends Component {
    static propTypes = {
        activeCoin: PropTypes.object,
        coinData: PropTypes.object
    }

    render() {
        if (!this.props.activeCoin || !this.props.coinData || !this.props.activeCoin.Name){
            return <div className="alert alert-warning">Select a coin from the list below to see its data</div>;
        }
        return (
            <div className="container" style={infoStyle}>
                <p>{this.props.activeCoin.CoinName}'s current Price:</p>
                <div className="col-md-4">
                    <h1>{this.props.coinData.currentPrice}</h1>
                    <p>{this.props.coinData.pctChange}% change today</p>
                </div>
                <div className="col-md-4">
                    <p>Today's Open: {this.props.coinData.open}</p>
                    <p>Change: {this.props.coinData.usdChange}</p>
                </div>
                <div className="col-md-4">
                    <p>Today's High: {this.props.coinData.high}</p>
                    <p>Today's Low: {this.props.coinData.low}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeCoin: state.histData.activeCoin,
    coinData: state.histData.coinData
});

export default connect(mapStateToProps)(CoinInfo);
