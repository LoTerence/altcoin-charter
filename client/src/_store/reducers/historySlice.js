/* 
historySlice.js - redux state slice for storing the cryptocoin chart's historical data 
*/
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHisto } from "../../lib/timeframe";

// TODO: implement typescript would make it clear what each data field is supposed to be.
//  - idk if activeTimeframe is supposed to be an obj or a str
//  - status: "idle" | "loading" | "succeeded" | "failed",

const initialState = {
  activeCoinId: null,
  activeTimeframe: "1day",
  coinInfo: null,
  error: null,
  historicalData: null,
  status: "idle",
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setActiveCoinId: (state, action) => {
      state.activeCoinId = action.payload;
    },
    setCoinInfo: (state, action) => {
      state.coinInfo = action.payload;
      state.status = "idle";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTimeFrame: (state, action) => {
      state.activeTimeframe = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoinInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCoinInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coinInfo = action.payload;
      })
      .addCase(fetchCoinInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error: something went wrong, please try again later 😢";
      })
      .addCase(fetchHistory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.historicalData = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error: something went wrong, please try again later 😢";
      });
  },
});

export const {
  setActiveCoinId,
  setCoinInfo,
  setError,
  setStatus,
  setTimeFrame,
} = historySlice.actions;

// Async thunks
// get the historical data from the cryptocompare api and save it to historicalData
export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async ({ coinSymbol, timeframe }) => {
    const histo = getHisto(timeframe);

    const cryptocompareRes = await axios.get(
      `https://min-api.cryptocompare.com/data/${histo.timeUnit}?fsym=${coinSymbol}&tsym=USD&limit=${histo.limit}`
    );
    const data = cryptocompareRes.data.Data;
    const historicalData = [];
    //loop through the "Data" array from the json res and save its time property as the x coordinate and close property as the y coordinate
    for (let i = 0; i < data.length; i++) {
      const coord = {
        time: data[i].time,
        price: data[i].close,
      };
      historicalData.push(coord);
    }
    return historicalData;
  }
);

// Get the coin data from the cryptocompare api and save it to coinInfo
// TODO: I only need the coin.Symbol
export const fetchCoinInfo = createAsyncThunk(
  "history/fetchCoinInfo",
  async (coin) => {
    const cryptocompareRes = await axios.get(
      `https://min-api.cryptocompare.com/data/generateAvg?fsym=${coin.Name}&tsym=USD&e=CCCAGG`
    );
    const data = cryptocompareRes.data.DISPLAY;

    const info = {
      currentPrice: data.PRICE,
      pctChange: data.CHANGEPCT24HOUR,
      open: data.OPEN24HOUR,
      high: data.HIGH24HOUR,
      low: data.LOW24HOUR,
      usdChange: data.CHANGE24HOUR,
    };

    return info;
  }
);

// Selector
export const selectHistory = (state) => state.history;

export default historySlice.reducer;
