/* histData.js 
--- actions related to chart's historical data 
This application uses cryptocompare.com's api to fetch a cryptocurrency's data - credit goes to cryptocompare.com
*/

// import axios middleware and consts
import axios from "axios";
import {
  GET_HIST_DATA,
  HIST_DATA_ERR,
  GET_COIN_DATA,
  SET_TIMEFRAME,
  SET_ACTIVE_COIN,
} from "./constants";

// set parameters for getHistData function so that it takes in coin and timeframe
// GET historical data: dispatches an array of objects with x and y coordinates
export const getHistData = (coin, timeframe) => {
  var histo;
  switch (timeframe) {
    case "1hour":
      histo = { timeUnit: "histominute", limit: 60 };
      break;
    case "12hours":
      histo = { timeUnit: "histominute", limit: 720 };
      break;
    case "1day":
      histo = { timeUnit: "histominute", limit: 1440 };
      break;
    case "1week":
      histo = { timeUnit: "histohour", limit: 168 };
      break;
    case "1month":
      histo = { timeUnit: "histoday", limit: 31 };
      break;
    case "3months":
      histo = { timeUnit: "histoday", limit: 92 };
      break;
    case "1year":
      histo = { timeUnit: "histoday", limit: 365 };
      break;
    default:
      console.log(
        "error in getHistData function in actions/histData timeframe cases"
      );
  }

  return (dispatch) => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/" +
          histo.timeUnit +
          "?fsym=" +
          coin.Name +
          "&tsym=USD&limit=" +
          histo.limit
      )
      .then((res) => {
        //array that will hold the historical data/payload/xy coordinates
        let histData = [];
        //loop through the "Data" array from the json res and save its time property as the x coordinate and close property as the y coordinate
        for (let i = 0; i < res.data.Data.length; i++) {
          let date = new Date(res.data.Data[i].time * 1000);
          let coord = {
            x: date,
            y: res.data.Data[i].close,
          };
          histData.push(coord);
        }

        dispatch({
          type: GET_HIST_DATA,
          payload: histData,
        });
      })
      .catch((err) => {
        console.log(
          "error in getHistData method api call to cryptocompare.com \n" + err
        );
        dispatch(histDataError("err"));
      });
  };
};

// action creator for when there is an error the other action functions
function histDataError(error) {
  return {
    type: HIST_DATA_ERR,
    payload: error,
  };
}

// getCoinData(coin)  => function that takes a coin obj and dispatches that coin's current trading info (price, vol, open, high, low etc) from the last 24 hours
export function getCoinData(coin) {
  return (dispatch) => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/generateAvg?fsym=" +
          coin.Name +
          "&tsym=USD&e=CCCAGG"
      )
      .then((res) => {
        let coindata = {
          currentPrice: res.data.DISPLAY.PRICE,
          pctChange: res.data.DISPLAY.CHANGEPCT24HOUR,
          open: res.data.DISPLAY.OPEN24HOUR,
          high: res.data.DISPLAY.HIGH24HOUR,
          low: res.data.DISPLAY.LOW24HOUR,
          usdChange: res.data.DISPLAY.CHANGE24HOUR,
          //marketCap: res.data.DISPLAY.,
          //supply: res.data.DISPLAY.
        };

        dispatch({
          type: GET_COIN_DATA,
          payload: coindata,
        });
      })
      .catch((err) => {
        console.log("error in getCoinData function api request: " + err);
        dispatch(histDataError("err"));
      });
  };
}

// setActiveTimeframe(timeframe)  => an action creator that takes a string that represents a time frame (1day, 1week, 1month, 3months, 1year...)
//     and sets it as the active time frame
export function setActiveTimeframe(timeframe) {
  return {
    type: SET_TIMEFRAME,
    payload: timeframe,
  };
}

// SET ACTIVE COIN - action that sets the coin parameter to the applications active coin-the coin that the app will display info about
export function setActiveCoin(coin) {
  return {
    type: SET_ACTIVE_COIN,
    payload: coin,
  };
}
