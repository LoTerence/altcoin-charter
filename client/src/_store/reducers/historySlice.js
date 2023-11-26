/* 
This is the Redux state slice for cryptocoin chart's historical data 
*/

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// TODO: use error, setError, to show fetch errors in the CoinInfo component
// TODO: change activeCoin to activeCoinId to save memory
// TODO: typescript would make it clear what each data field is supposed to be.
//  - idk if activeTimeframe is supposed to be an obj or a str

// status: "idle" | "loading" | "succeeded" | "failed",

const initialState = {
  activeCoin: {},
  activeTimeframe: "1day",
  coinInfo: null,
  error: null,
  histData: null,
  status: "idle",
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setActiveCoin: (state, action) => {
      state.activeCoin = action.payload;
    },
    setCoinInfo: (state, action) => {
      state.coinInfo = action.payload;
      state.status = "idle";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setHistData: (state, action) => {
      state.histData = action.payload;
      state.status = "idle";
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTimeFrame: (state, action) => {
      state.activeTimeframe = action.payload;
    },
  },
});

export const {
  setHistData,
  setCoinInfo,
  setTimeFrame,
  setActiveCoin,
  setError,
  setStatus,
} = historySlice.actions;

// Async thunks
// get the historical data from the cryptocompare api and save it to histData
export const getHistData = (coin, timeframe) => (dispatch) => {
  dispatch(setStatus("loading"));
  let histo;
  switch (timeframe) {
    case "1hour":
      histo = { timeUnit: "histominute", limit: 60 };
      break;
    case "12hours":
      histo = { timeUnit: "histominute", limit: 144 };
      break;
    case "1day":
      histo = { timeUnit: "histominute", limit: 288 };
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
        // let date = new Date(res.data.Data[i].time * 1000);
        let coord = {
          time: res.data.Data[i].time,
          price: res.data.Data[i].close,
        };
        histData.push(coord);
      }

      dispatch(setHistData(histData));
    })
    .catch((err) => {
      console.log(
        "error in getHistData method api call to cryptocompare.com: \n" + err
      );
      dispatch(setError("error fetching data from cryptocompare.com"));
      dispatch(setStatus("idle"));
    });
};

// TODO: move coin data logic and state to coinInfo component?
// Get the coin data from the cryptocompare api and save it to coinInfo
export const fetchCoinInfo = (coin) => (dispatch) => {
  dispatch(setStatus("loading"));
  axios
    .get(
      `https://min-api.cryptocompare.com/data/generateAvg?fsym=${coin.Name}&tsym=USD&e=CCCAGG`
    )
    .then((res) => {
      let info = {
        currentPrice: res.data.DISPLAY.PRICE,
        pctChange: res.data.DISPLAY.CHANGEPCT24HOUR,
        open: res.data.DISPLAY.OPEN24HOUR,
        high: res.data.DISPLAY.HIGH24HOUR,
        low: res.data.DISPLAY.LOW24HOUR,
        usdChange: res.data.DISPLAY.CHANGE24HOUR,
      };

      dispatch(setCoinInfo(info));
    })
    .catch((err) => {
      console.log("error in fetchCoinInfo function api request: \n" + err);
      dispatch(setError("error fetching data from cryptocompare.com"));
      dispatch(setStatus("idle"));
    });
};

// Selector
export const selectHistory = (state) => state.history;

export default historySlice.reducer;
