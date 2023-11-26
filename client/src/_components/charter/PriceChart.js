/* PriceChart.js
--- Component that renders a Chart showing the price history of a selected coin.
This component uses Uber's react-vis library for data visualization / programming the chart
*/

// TODO: refactor this entire component
// - move formatterUSD to /lib
// - refactor formatXAxis, move switch case out of the component into its own function (deriveTickDate)

import { useSelector } from "react-redux";
import { selectHistory } from "../../_store/reducers/historySlice";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

let formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PriceChart = () => {
  const { activeCoinId, activeTimeframe, histData } =
    useSelector(selectHistory);

  const formatXAxis = (tick) => {
    const d = new Date(tick * 1000);
    let tickDate = 0;
    switch (activeTimeframe) {
      case "1hour":
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
          month: "short",
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

  if (!histData || !activeCoinId) {
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
            angle={35}
            dy={20}
            tick={{ fontSize: 14 }}
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
