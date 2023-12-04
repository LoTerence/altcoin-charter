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
import { initTimeframeOpts } from "../../lib/timeframe";

const timeframeOpts = initTimeframeOpts();

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
      dispatch(fetchHistory({ coinSymbol: activeCoin.symbol, timeframe }));
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
            className={`m-px border-grey btn btn-md ${
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
