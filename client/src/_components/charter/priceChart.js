/* priceChart.js
--- Component that renders a Chart showing the price history of a selected coin.
This component uses Uber's react-vis library for data visualization / programming the chart
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair } from 'react-vis';
import { setActiveCoin, setActiveTimeframe } from '../../_store/actions/histData';

// Converts a time obj to a string
function timeToStr(timeObj) {
  let d = new Date(timeObj);
  // Minutes part from the timestamp
  var minutes = "0" + d.getMinutes();
  // Seconds part from the timestamp
  var weekdays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
  var weekday = weekdays[d.getDay()];
  var months = d.getMonth() + 1;
  return weekday+', '+ months +'/'+d.getDate()+' '+d.getHours()+':'+minutes.substr(-2);
}

const XYPlotStyle = {
  paddingLeft: '30px'
};

// PriceChart Component
class PriceChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [{x:0, y:0}]
    };
  }

  static propTypes = {
    histData: PropTypes.array
  }

  componentWillMount() {
    this.props.setActiveCoin({});
    this.props.setActiveTimeframe("1day");
  }

  render() {
    if(!this.props.histData || !this.props.activeCoin || !this.props.activeCoin.Name){
      return (
        <div width={1000} height={400}>
          <p>Please select a coin from the list below</p>
        </div>
      )
    }
    return (
      <div>
        <XYPlot
          style={XYPlotStyle}
          width={1000}
          height={400}
          xType={'time'}
          onMouseLeave={() => this.setState({crosshairValues: [{x:0, y:0}]})}
          >
          <HorizontalGridLines />
          <LineSeries 
            data={this.props.histData}
            onNearestX={(datapoint, {index}) =>
          	  this.setState({crosshairValues: [ {x:this.props.histData[index].x , y:this.props.histData[index].y} ] }) } 
            />
          <XAxis />
          <YAxis />
          <Crosshair values={this.state.crosshairValues}>
            <div style={{background: 'black'}}>
              <p>{timeToStr(this.state.crosshairValues[0].x)}</p>
              <p>Price: ${this.state.crosshairValues[0].y}</p>
            </div>
          </Crosshair>
        </XYPlot>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  histData: state.histData.histData,
  activeCoin: state.histData.activeCoin
});

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCoin: (coin) => dispatch(setActiveCoin(coin)),
    setActiveTimeframe: (timeframe) => dispatch(setActiveTimeframe(timeframe))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceChart);
