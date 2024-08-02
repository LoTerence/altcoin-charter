/*
 * historySlice -
 * redux slice for storing the cryptocoin chart's historical data
 */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHisto } from "../../lib/timeframe";
import { getCoinDailyAverageData } from "../../lib/cryptocompareAPI";

// TODO: implement typescript - this would make it clear what each data field is supposed to be.
//  - ie. `activeTimeframe` should be a string
//  - `coinInfo` should be null or an object
//  - `status`: "idle" | "loading" | "succeeded" | "failed",

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
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchCoinInfo.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.coinInfo = action.payload;
      })
      .addCase(fetchCoinInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error?.message ||
          "Error: something went wrong, please try again later 😢";
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
        state.error =
          action.error?.message ||
          "Error: something went wrong, please try again later 😢";
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

    const res = await fetch(
      `https://min-api.cryptocompare.com/data/${histo.timeUnit}?fsym=${coinSymbol}&tsym=USD&limit=${histo.limit}`
    );
    if (!res.ok) {
      console.log("!res.ok");
      throw new Error("Error: something went wrong, please try again later 😢");
    }

    const data = await res.json();
    if (data?.Response !== "Success" || !data?.Data) {
      console.log('data?.Response !== "Success" || !data?.Data');
      throw new Error("Sorry! No market data available for this coin 😢");
    }
    const DATA = data.Data;

    // todo: refactor this calculation into its own specialized function in histo, so I can remove the below comment
    //loop through the `data.Data` array from the json res and save its `time` property as the x coordinate and `close` property as the y coordinate.
    const historicaData = DATA.map((timeUnitData) => {
      return {
        time: timeUnitData.time,
        price: timeUnitData.close,
      };
    });
    // todo: change `price` variable name to `close` - both here, and in price chart

    return historicaData;
  }
);

export const fetchCoinInfo = createAsyncThunk(
  "history/fetchCoinInfo",
  async (coinSymbol) => {
    const { DISPLAY } = await getCoinDailyAverageData(coinSymbol);

    const coinInfo = {
      currentPrice: DISPLAY.PRICE,
      pctChange: DISPLAY.CHANGEPCT24HOUR,
      open: DISPLAY.OPEN24HOUR,
      high: DISPLAY.HIGH24HOUR,
      low: DISPLAY.LOW24HOUR,
      usdChange: DISPLAY.CHANGE24HOUR,
    };
    return coinInfo;
  }
);

export const selectHistory = (state) => state.history;

export default historySlice.reducer;
