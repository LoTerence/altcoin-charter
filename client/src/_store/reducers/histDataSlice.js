/* 
This is the Redux state slice for cryptocoin chart's historical data 
*/

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const histDataSlice = createSlice({
  name: "histData",
  initialState: {
    activeCoin: {},
    activeTimeframe: "1day",
  },
  reducers: {
    setHistData: (state, action) => {
      state.histData = action.payload;
    },
    setCoinData: (state, action) => {
      state.coinData = action.payload;
    },
    setTimeFrame: (state, action) => {
      state.activeTimeframe = action.payload;
    },
    setActiveCoin: (state, action) => {
      state.activeCoin = action.payload;
    },
    histDataErr: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setHistData,
  setCoinData,
  setTimeFrame,
  setActiveCoin,
  histDataErr,
} = histDataSlice.actions;

// Async thunks
// get the historical data from the cryptocompare api and save it to histData
export const getHistData = (coin, timeframe) => (dispatch) => {
  let histo;
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

  axios
    .get(
      `https://min-api.cryptocompare.com/data/${histo.timeUnit}?fsym=${coin.Name}&tsym=USD&limit=${histo.limit}`
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

      dispatch(setHistData(histData));
    })
    .catch((err) => {
      console.log(
        "error in getHistData method api call to cryptocompare.com: \n" + err
      );
      dispatch(histDataErr("err"));
    });
};

// Get the coin data from the cryptocompare api and save it to coinData
export const getCoinData = (coin) => (dispatch) => {
  axios
    .get(
      `https://min-api.cryptocompare.com/data/generateAvg?fsym=${coin.Name}&tsym=USD&e=CCCAGG`
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

      dispatch(setCoinData(coindata));
    })
    .catch((err) => {
      console.log("error in getCoinData function api request: \n" + err);
      dispatch(histDataErr("err"));
    });
};

// export const setActiveTimeframe = (timeframe) => (dispatch) => {
//   dispatch(setTimeFrame(timeframe));
// };

// export const setActiveCoinAction = (coin) => (dispatch) => {
//   dispatch(setActiveCoin(coin));
// };

// Selector
export const selectHistData = (state) => state.histData;

export default histDataSlice.reducer;
