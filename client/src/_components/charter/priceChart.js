/* priceChart.js
--- Component that renders a Chart showing the price history of a selected coin.
This component uses Uber's react-vis library for data visualization / programming the chart
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import { getHistData } from '../../_store/actions/histData';

//TODO: onhover that shows the coin price for the time where the mouse is hovering over
//TODO: rerender this chart with new information each time the active coin or active time period changes
// TODO** get the chart to display historical data from the api


class PriceChart extends Component {
  static propTypes = {
    getHistData: PropTypes.func.isRequired,
    histData: PropTypes.array.isRequired
  }

  static defaultProps = {
    histData: []
  }

  componentWillMount() {
    this.props.getHistData();
  }

  render() {
    return (
      <div>
        <XYPlot
          width={900}
          height={400}
          xType={'time'}>
          <HorizontalGridLines />
          <LineSeries
            data={this.props.histData}/>
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  histData: state.histData.data
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHistData: () => dispatch(getHistData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceChart);
