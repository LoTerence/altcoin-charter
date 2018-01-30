/*
timeFrameList.js
component that displays buttons for selecting active time frame
The default time frame is day
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveTimeframe, getHistData } from '../../_store/actions/histData';

//TODO: change colors of buttons when a new active timeframe is selected
//TODO: onclick event gets new coin historical data
//TODO: set default active timeframe to day

export class TimeFrameList extends Component {
  static propTypes = {
    setActiveTimeframe: PropTypes.func.isRequired,
    activeCoin: PropTypes.object
  }

  handleClickEvent(tf) {
    this.props.setActiveTimeframe(tf);
    if (this.props.activeCoin) {
      this.props.getHistData(this.props.activeCoin, tf);
    }
  }

  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
        <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
        <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
        <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
        <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
        <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
        <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  activeCoin: state.coinList.activeCoin
});

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTimeframe: (timeframe) => dispatch(setActiveTimeframe(timeframe)),
    getHistData: (activeCoin, timeframe) => dispatch(getHistData(activeCoin, timeframe))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeFrameList);
