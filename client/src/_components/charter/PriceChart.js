/* PriceChart.js
--- Component that renders a Chart showing the price history of a selected coin.
This component uses Uber's react-vis library for data visualization / programming the chart
*/

import React from "react";
import { useSelector } from "react-redux";
import { selectHistData } from "../../_store/reducers/histDataSlice";
import {
  LineChart,
  Line,
  Label,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

let formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// PriceChart Component
const PriceChart = () => {
  const histData = useSelector(selectHistData).histData;
  const activeCoin = useSelector(selectHistData).activeCoin;
  const activeTimeframe = useSelector(selectHistData).activeTimeframe;

  const formatXAxis = (tick) => {
    const d = new Date(tick * 1000);
    let tickDate = 0;
    switch (activeTimeframe) {
      case "1hour":
        // tickDate = d.getHours() + ":" + d.getMinutes();
        tickDate = d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        break;
      case "12hours":
        tickDate = d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        break;
      case "1day":
        tickDate = d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        break;
      case "1week":
        tickDate = d.toLocaleDateString([], {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
        });
        break;
      case "1month":
        tickDate = d.toLocaleDateString([], {
          month: "short",
          day: "numeric",
        });
        break;
      case "3months":
        tickDate = d.toLocaleDateString([], {
          month: "short",
          day: "numeric",
        });
        break;
      case "1year":
        tickDate = d.toLocaleDateString([], {
          month: "long",
          year: "numeric",
        });
        break;
      default:
        console.log("error in formatXAxis timeframe cases");
    }
    return tickDate;
  };

  const formatYAxis = (tick) => {
    return formatterUSD.format(tick);
  };

  const formatToolTipX = (label) => {
    const d = new Date(label * 1000);
    return d.toLocaleString();
  };

  const formatToolTipY = (val) => {
    return formatterUSD.format(val);
  };

  if (!histData || !activeCoin || !activeCoin.Name) {
    return <p>Please select a coin from the list below</p>;
  }

  return (
    <div className="">
      <ResponsiveContainer width={"100%"} height={500}>
        <LineChart
          data={histData}
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            scale="time"
            dataKey="time"
            domain={["dataMin", "dataMax"]}
            tickFormatter={formatXAxis}
          >
            <Label
              value={"Time"}
              position="bottom"
              style={{ textAnchor: "middle" }}
            />
          </XAxis>
          <YAxis
            domain={["dataMin", "dataMax"]}
            tickFormatter={formatYAxis}
            style={{ fontSize: ".75rem" }}
          >
            <Label
              value={"Price ($)"}
              position="left"
              angle={-90}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip formatter={formatToolTipY} labelFormatter={formatToolTipX} />
          <Line dataKey="price" name="Price" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
