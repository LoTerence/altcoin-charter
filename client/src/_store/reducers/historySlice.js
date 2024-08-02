/*
 * historySlice -
 * redux slice for storing the cryptocoin chart's historical data
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHisto } from "../../lib/timeframe";
import {
  getCoinDailyAverageData,
  getCoinHistory,
} from "../../lib/cryptocompareAPI";

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
      })
      .addCase(fetchCharterData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCharterData.fulfilled, (state, action) => {
        state.status = "succeeded";
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

export const fetchCharterData = createAsyncThunk(
  "history/fetchCharterData",
  async ({ coin, timeframe }) => {
    const coinSymbol = coin.symbol;
    const histo = getHisto(timeframe);

    const [dailyAverageData, history] = await Promise.all([
      getCoinDailyAverageData(coinSymbol),
      getCoinHistory({
        coinSymbol,
        timeUnit: histo.timeUnit,
        limit: histo.limit,
      }),
    ]);

    const { DISPLAY } = dailyAverageData;
    const coinInfo = {
      currentPrice: DISPLAY.PRICE,
      pctChange: DISPLAY.CHANGEPCT24HOUR,
      open: DISPLAY.OPEN24HOUR,
      high: DISPLAY.HIGH24HOUR,
      low: DISPLAY.LOW24HOUR,
      usdChange: DISPLAY.CHANGE24HOUR,
    };

    const historicalData = history.Data.map((historicalPoint) => ({
      time: historicalPoint.time,
      price: historicalPoint.close,
    }));
    // todo: change `price` variable name to `close` - both here, and in price chart

    return { coinInfo, historicalData };
  }
);

/* Async thunks */
export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async ({ coinSymbol, timeframe }) => {
    const histo = getHisto(timeframe);

    const history = await getCoinHistory({
      coinSymbol,
      timeUnit: histo.timeUnit,
      limit: histo.limit,
    });

    return history.Data.map((historicalPoint) => ({
      time: historicalPoint.time,
      price: historicalPoint.close,
    }));
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
