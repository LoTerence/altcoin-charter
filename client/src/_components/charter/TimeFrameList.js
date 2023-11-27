/*
TimeFrameList.js
  Component that displays buttons for selecting active time frame
  The default time frame is day
*/
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHistory,
  selectHistory,
  setTimeFrame,
} from "../../_store/reducers/historySlice";
import { useActiveCoin } from "../hooks";

const timeframeOpts = [
  { id: 0, value: "1hour", text: "1Hr" },
  { id: 1, value: "12hours", text: "12Hrs" },
  { id: 2, value: "1day", text: "Day" },
  { id: 3, value: "1week", text: "Week" },
  { id: 4, value: "1month", text: "Month" },
  { id: 5, value: "3months", text: "3months" },
  { id: 6, value: "1year", text: "Year" },
];

const TimeFrameList = () => {
  const dispatch = useDispatch();
  const activeCoin = useActiveCoin();
  const { activeTimeframe } = useSelector(selectHistory);

  const handleButtonClick = (e) => {
    e.preventDefault();
    const timeframe = e.target.value;
    if (activeTimeframe === timeframe) return;
    dispatch(setTimeFrame(timeframe));
    if (activeCoin) {
      dispatch(fetchHistory({ coinSymbol: activeCoin.Symbol, timeframe }));
    }
  };

  return (
    <div
      className="flex-wrap"
      role="group"
      aria-label="Timeframes button group"
    >
      {timeframeOpts.map((opt) => {
        const { id, text, value } = opt;
        const isActive = activeTimeframe === value;
        return (
          <button
            className={`m1px border-grey btn btn-md ${
              isActive ? "btn-success" : "btn-outline-dark"
            }`}
            disabled={isActive}
            key={id}
            onClick={(e) => handleButtonClick(e)}
            value={value}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};

export default TimeFrameList;
