/*
timeFrameList.js
component that displays buttons for selecting active time frame
The default time frame is day
*/
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeFrame,
  getHistData,
  selectHistData,
} from "../../_store/reducers/histDataSlice";

// optional TODO: clean up the render function. The code works but its ugly

const TimeFrameList = () => {
  const dispatch = useDispatch();
  const activeCoin = useSelector(selectHistData).activeCoin;
  const activeTimeframe = useSelector(selectHistData).activeTimeframe;

  // tf is a string representing the timeframe (1hour, 12hours, 1day, 1week, 1month, 3months, 1year)
  const handleClickEvent = (e, tf) => {
    e.preventDefault();
    dispatch(setTimeFrame(tf));
    if (activeCoin) {
      // this.props.getHistData(this.props.activeCoin, tf);
      dispatch(getHistData(activeCoin, tf));
    }
  };

  const buttonList = [
    <button
      className="btn btn-default"
      onClick={(e) => handleClickEvent(e, "1hour")}
      key={0}
    >
      1Hr
    </button>,
    <button
      className="btn btn-default"
      onClick={(e) => handleClickEvent(e, "12hours")}
      key={1}
    >
      12Hrs
    </button>,
    <button
      className="btn btn-default"
      onClick={(e) => handleClickEvent(e, "1day")}
      key={2}
    >
      Day
    </button>,
    <button
      className="btn btn-default"
      onClick={(e) => handleClickEvent(e, "1week")}
      key={3}
    >
      Week
    </button>,
    <button
      className="btn btn-default"
      onClick={(e) => handleClickEvent(e, "1month")}
      key={4}
    >
      Month
    </button>,
    <button
      className="btn btn-default"
      onClick={(e) => handleClickEvent(e, "3months")}
      key={5}
    >
      3months
    </button>,
    <button
      className="btn btn-default"
      onClick={(e) => handleClickEvent(e, "1year")}
      key={6}
    >
      Year
    </button>,
  ];

  let tfl = buttonList;
  switch (activeTimeframe) {
    case "1hour":
      tfl[0] = (
        <button
          className="btn btn-success"
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
          className="btn btn-success"
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
          className="btn btn-success"
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
          className="btn btn-success"
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
          className="btn btn-success"
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
          className="btn btn-success"
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
          className="btn btn-success"
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
    <div>
      {tfl.map((btn) => {
        return btn;
      })}
    </div>
  );
};

export default TimeFrameList;
