import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCoins } from "../../lib/cryptocompareAPI";
import { parseAllCoinSymbols } from "../../lib/transformers";

export const symbolsSlice = createSlice({
  name: "symbols",
  initialState: {
    status: "idle",
    error: null,
    symbols: [],
  },
  reducers: {
    setSymbols: (state, action) => {
      state.symbols = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSymbols.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.symbols = action.payload;
      })
      .addCase(fetchSymbols.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong while getting symbols";
      });
  },
});

export const { setSymbols, setStatus } = symbolsSlice.actions;

export const fetchSymbols = createAsyncThunk(
  "symbols/fetchSymbols",
  async () => {
    const allCoins = await getAllCoins();
    return parseAllCoinSymbols(allCoins);
  }
);

export const selectSymbols = (state) => state.symbols;

export default symbolsSlice.reducer;
