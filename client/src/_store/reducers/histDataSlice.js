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
    fetchHistInProgress: false,
    fetchCoinInProgress: false,
    error: "",
  },
  reducers: {
    setHistData: (state, action) => {
      state.histData = action.payload;
      state.fetchHistInProgress = false;
    },
    setCoinData: (state, action) => {
      state.coinData = action.payload;
      state.fetchCoinInProgress = false;
    },
    setTimeFrame: (state, action) => {
      state.activeTimeframe = action.payload;
    },
    setActiveCoin: (state, action) => {
      state.activeCoin = action.payload;
    },
    setFetchHistInProgress: (state, action) => {
      state.fetchHistInProgress = action.payload;
    },
    setFetchCoinInProgress: (state, action) => {
      state.fetchCoinInProgress = action.payload;
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
  setFetchHistInProgress,
  setFetchCoinInProgress,
  histDataErr,
} = histDataSlice.actions;

// Async thunks
// get the historical data from the cryptocompare api and save it to histData
export const getHistData = (coin, timeframe) => (dispatch) => {
  dispatch(setFetchHistInProgress(true));
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
      dispatch(histDataErr("error fetching data from cryptocompare.com"));
      dispatch(setFetchHistInProgress(false));
    });
};

// Get the coin data from the cryptocompare api and save it to coinData
export const getCoinData = (coin) => (dispatch) => {
  dispatch(setFetchCoinInProgress(true));
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
      };

      dispatch(setCoinData(coindata));
    })
    .catch((err) => {
      console.log("error in getCoinData function api request: \n" + err);
      dispatch(histDataErr("error fetching data from cryptocompare.com"));
      dispatch(setFetchCoinInProgress(false));
    });
};

// Selector
export const selectHistData = (state) => state.histData;

export default histDataSlice.reducer;
