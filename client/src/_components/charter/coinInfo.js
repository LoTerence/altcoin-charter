/* 
coinInfo.js 
component that will display the active coin's day's data including current price, 
    day's %change, day's open, high, low, incremental change, market cap, and supply
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//TODO: add custom css to make it look better

class CoinInfo extends Component {
    static propTypes = {
        activeCoin: PropTypes.object,
        coinData: PropTypes.object
    }

    render() {
        if (!this.props.activeCoin || !this.props.coinData || !this.props.activeCoin.Name){
            return <p>Select a coin in the list below to see its data</p>;
        }
        return (
            <div className="container">
                <div className="col-md-4">
                    <h1>{this.props.coinData.currentPrice}</h1>
                    <p>{this.props.coinData.pctChange}%</p>
                </div>
                <div className="col-md-8">
                    <div className="col-md-4">
                        <p>Today's Open: {this.props.coinData.open}</p>
                        <p>Change: {this.props.coinData.usdChange}</p>
                    </div>
                    <div className="col-md-4">
                        <p>Today's High: {this.props.coinData.high}</p>
                        <p>Today's Low: {this.props.coinData.low}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeCoin: state.histData.activeCoin,
    coinData: state.histData.coinData
});

/*
const mapDispatchToProps = (dispatch) => {
    return {
    };
}; */

export default connect(mapStateToProps, null)(CoinInfo);
