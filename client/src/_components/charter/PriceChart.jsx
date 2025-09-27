/* 
--- Component that renders a Chart showing the price history of a selected coin.
This component uses Uber's react-vis library for data visualization / programming the chart
*/

import { useCallback } from "react";
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
import { getTickDateString } from "../../lib/timeframe";
import { formatToUSD } from "@/lib/transformers";

const formatYAxis = (tick) => {
  return formatToUSD(tick);
};

const formatToolTipX = (label) => {
  const d = new Date(label * 1000);
  return d.toLocaleString();
};

const formatToolTipY = (val) => {
  return formatToUSD(val);
};

export default function PriceChart() {
  const { activeCoinId, activeTimeframe, coinInfo, historicalData } =
    useSelector(selectHistory);
  const dataUnavailable =
    !historicalData || !activeCoinId || coinInfo?.hasNoData;

  const formatXAxis = useCallback(
    (tick) => {
      const date = new Date(tick * 1000);
      const tickDateString = getTickDateString(activeTimeframe, date);
      return tickDateString;
    },
    [activeTimeframe]
  );

  if (dataUnavailable) {
    return <p>Please select a coin from the list below</p>;
  }

  return (
    <div className="">
      <ResponsiveContainer width={"100%"} height={500}>
        <LineChart
          data={historicalData}
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
}
