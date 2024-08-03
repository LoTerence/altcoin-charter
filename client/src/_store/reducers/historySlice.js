/*
 * historySlice -
 * redux slice for storing the cryptocoin chart's historical data
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHisto } from "../../lib/timeframe";
import { getCoinDisplayData, getCoinHistory } from "../../lib/cryptocompareAPI";
import {
  parseCoinDisplayData,
  parseHistoryIntoCoordinates,
} from "../../lib/transformers";

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
      .addCase(fetchHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.historicalData = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error?.message ||
          "Error: something went wrong, please try again later 😢";
      })
      .addCase(fetchCharterData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCharterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.historicalData = action.payload.historicalData;
        state.coinInfo = action.payload.coinInfo;
      })
      .addCase(fetchCharterData.rejected, (state, action) => {
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

/* Async thunks */
export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async ({ coinSymbol, timeframe }) => {
    const histo = getHisto(timeframe);

    const history = await getCoinHistory({
      fromSymbol: coinSymbol,
      timeUnit: histo.timeUnit,
      limit: histo.limit,
    });

    const historicalData = parseHistoryIntoCoordinates(history);
    return historicalData;
  }
);

export const fetchCharterData = createAsyncThunk(
  "history/fetchCharterData",
  async ({ coin, timeframe }) => {
    const histo = getHisto(timeframe);

    const [coinDisplayData, history] = await Promise.all([
      getCoinDisplayData({
        fromSymbol: coin.symbol,
      }),
      getCoinHistory({
        fromSymbol: coin.symbol,
        timeUnit: histo.timeUnit,
        limit: histo.limit,
      }),
    ]);

    const coinInfo = parseCoinDisplayData(coinDisplayData);
    const historicalData = parseHistoryIntoCoordinates(history);
    return { coinInfo, historicalData };
  }
);

export const selectHistory = (state) => state.history;

export default historySlice.reducer;
