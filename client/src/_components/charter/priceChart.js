/* priceChart.js
--- Component that renders a Chart showing the price history of a selected coin.
This component uses Uber's react-vis library for data visualization / programming the chart
*/

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
} from "react-vis";
import { selectHistData } from "../../_store/reducers/histDataSlice";

// Converts a time obj to a string
function timeToStr(timeObj) {
  let d = new Date(timeObj);
  // Minutes part from the timestamp
  var minutes = "0" + d.getMinutes();
  // Seconds part from the timestamp
  var weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  var weekday = weekdays[d.getDay()];
  var months = d.getMonth() + 1;
  return (
    weekday +
    ", " +
    months +
    "/" +
    d.getDate() +
    " " +
    d.getHours() +
    ":" +
    minutes.substr(-2)
  );
}

const XYPlotStyle = {
  paddingLeft: "30px",
};

// PriceChart Component
const PriceChart = () => {
  const [crosshairValues, setCrossHairValues] = useState([{ x: 0, y: 0 }]);
  const histData = useSelector(selectHistData).histData;
  const activeCoin = useSelector(selectHistData).activeCoin;

  if (!histData || !activeCoin || !activeCoin.Name) {
    return (
      <div width={1000} height={400}>
        <p>Please select a coin from the list below</p>
      </div>
    );
  }

  return (
    <div>
      <XYPlot
        style={XYPlotStyle}
        width={1000}
        height={400}
        xType={"time"}
        onMouseLeave={() => setCrossHairValues([{ x: 0, y: 0 }])}
      >
        <HorizontalGridLines />
        <LineSeries
          data={histData}
          onNearestX={(datapoint, { index }) => {
            setCrossHairValues([
              {
                x: histData[index].x,
                y: histData[index].y,
              },
            ]);
          }}
        />
        <XAxis />
        <YAxis />
        <Crosshair values={crosshairValues}>
          <div style={{ background: "black" }}>
            <p>{timeToStr(crosshairValues[0].x)}</p>
            <p>Price: ${crosshairValues[0].y}</p>
          </div>
        </Crosshair>
      </XYPlot>
    </div>
  );
};

export default PriceChart;
