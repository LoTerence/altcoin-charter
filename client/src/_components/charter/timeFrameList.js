/*
timeFrameList.js
component that displays buttons for selecting active time frame
The default time frame is day
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveTimeframe, getHistData } from '../../_store/actions/histData';

// optional TODO: clean up the render function. The code works but its ugly

export class TimeFrameList extends Component {
  static propTypes = {
    setActiveTimeframe: PropTypes.func.isRequired,
    activeCoin: PropTypes.object,
    activeTimeframe: PropTypes.string.isRequired
  }

  handleClickEvent(tf) {
    this.props.setActiveTimeframe(tf);
    if (this.props.activeCoin) {
      this.props.getHistData(this.props.activeCoin, tf);
    }
  }

  render() {
    let tfl;
    switch (this.props.activeTimeframe) {
      case "1hour":
        tfl = (
          <div>
            <button className="btn btn-success" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
          </div>);
        break;
      case "12hours":
        tfl = (
          <div>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
            <button className="btn btn-success" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
          </div>);
        break;
      case "1day":
        tfl = (
          <div>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
            <button className="btn btn-success" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
          </div>);
        break;
      case "1week":
        tfl = (
          <div>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
            <button className="btn btn-success" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
          </div>);
        break;
      case "1month":
        tfl = (
          <div>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
            <button className="btn btn-success" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
          </div>);
        break;
      case "3months":
        tfl = (
          <div>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
            <button className="btn btn-success" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
          </div>);
        break;
      case "1year":
        tfl = (
          <div>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1hour")}>1Hr</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"12hours")}>12Hrs</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1day")}>Day</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1week")}>Week</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"1month")}>Month</button>
            <button className="btn btn-default" onClick={this.handleClickEvent.bind(this,"3months")}>3months</button>
            <button className="btn btn-success" onClick={this.handleClickEvent.bind(this,"1year")}>Year</button>
          </div>);
        break;
      default:
          tfl = <p>Error in timeFrameList component switch case</p>;
    }
    return tfl;
  }
}

const mapStateToProps = (state) => ({
  activeCoin: state.coinList.activeCoin,
  activeTimeframe: state.histData.activeTimeframe
});

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTimeframe: (timeframe) => dispatch(setActiveTimeframe(timeframe)),
    getHistData: (activeCoin, timeframe) => dispatch(getHistData(activeCoin, timeframe))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeFrameList);
