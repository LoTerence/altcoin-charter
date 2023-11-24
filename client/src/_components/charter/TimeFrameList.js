/*
timeFrameList.js
component that displays buttons for selecting active time frame
The default time frame is day
*/
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeFrame,
  getHistData,
  selectHistData,
} from "../../_store/reducers/histDataSlice";

const m1px = {
  margin: "1px",
  borderColor: "#ccc",
};

const TimeFrameList = () => {
  const dispatch = useDispatch();
  const { activeCoin, activeTimeframe } = useSelector(selectHistData);

  // tf is a string representing the timeframe (1hour, 12hours, 1day, 1week, 1month, 3months, 1year)
  const handleClickEvent = (e, tf) => {
    e.preventDefault();
    dispatch(setTimeFrame(tf));
    if (activeCoin) {
      dispatch(getHistData(activeCoin, tf));
    }
  };

  const buttonList = [
    <button
      className="btn btn-outline-dark btn-sm"
      style={m1px}
      onClick={(e) => handleClickEvent(e, "1hour")}
      key={0}
    >
      1Hr
    </button>,
    <button
      className="btn btn-outline-dark btn-sm "
      style={m1px}
      onClick={(e) => handleClickEvent(e, "12hours")}
      key={1}
    >
      12Hrs
    </button>,
    <button
      className="btn btn-outline-dark btn-sm"
      style={m1px}
      onClick={(e) => handleClickEvent(e, "1day")}
      key={2}
    >
      Day
    </button>,
    <button
      className="btn btn-outline-dark btn-sm"
      style={m1px}
      onClick={(e) => handleClickEvent(e, "1week")}
      key={3}
    >
      Week
    </button>,
    <button
      className="btn btn-outline-dark btn-sm"
      style={m1px}
      onClick={(e) => handleClickEvent(e, "1month")}
      key={4}
    >
      Month
    </button>,
    <button
      className="btn btn-outline-dark btn-sm"
      style={m1px}
      onClick={(e) => handleClickEvent(e, "3months")}
      key={5}
    >
      3months
    </button>,
    <button
      className="btn btn-outline-dark btn-sm"
      style={m1px}
      onClick={(e) => handleClickEvent(e, "1year")}
      key={6}
    >
      Year
    </button>,
  ];

  // tfl is timeframe list
  let tfl = buttonList;
  switch (activeTimeframe) {
    case "1hour":
      tfl[0] = (
        <button
          className="btn btn-success btn-sm"
          style={m1px}
          onClick={(e) => handleClickEvent(e, "1hour")}
          key={0}
        >
          1Hr
        </button>
      );
      break;
    case "12hours":
      tfl[1] = (
        <button
          className="btn btn-success btn-sm"
          style={m1px}
          onClick={(e) => handleClickEvent(e, "12hours")}
          key={1}
        >
          12Hrs
        </button>
      );
      break;
    case "1day":
      tfl[2] = (
        <button
          className="btn btn-success btn-sm"
          style={m1px}
          onClick={(e) => handleClickEvent(e, "1day")}
          key={2}
        >
          Day
        </button>
      );
      break;
    case "1week":
      tfl[3] = (
        <button
          className="btn btn-success btn-sm"
          style={m1px}
          onClick={(e) => handleClickEvent(e, "1week")}
          key={3}
        >
          Week
        </button>
      );
      break;
    case "1month":
      tfl[4] = (
        <button
          className="btn btn-success btn-sm"
          style={m1px}
          onClick={(e) => handleClickEvent(e, "1month")}
          key={4}
        >
          Month
        </button>
      );
      break;
    case "3months":
      tfl[5] = (
        <button
          className="btn btn-success btn-sm"
          style={m1px}
          onClick={(e) => handleClickEvent(e, "3months")}
          key={5}
        >
          3months
        </button>
      );
      break;
    case "1year":
      tfl[6] = (
        <button
          className="btn btn-success btn-sm"
          style={m1px}
          onClick={(e) => handleClickEvent(e, "1year")}
          key={6}
        >
          Year
        </button>
      );
      break;
    default:
      tfl = <p>Error in timeFrameList component switch case</p>;
  }

  return (
    <div
      className="flex-wrap"
      role="group"
      aria-label="Timeframes button group"
    >
      {tfl.map((btn) => {
        return btn;
      })}
    </div>
  );
};

export default TimeFrameList;
