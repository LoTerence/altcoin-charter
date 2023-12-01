import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      .addCase(fetchSymbols.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.symbols = action.payload;
      })
      .addCase(fetchSymbols.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong while getting symbols";
      });
  },
});

export const { setSymbols, setStatus } = symbolsSlice.actions;

export const fetchSymbols = createAsyncThunk(
  "symbols/fetchSymbols",
  async () => {
    const res = await axios.get(
      "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
    );
    if (!res.data?.Data) {
      throw new Error("Something went wrong while getting symbol");
    }
    const initialSymbols = Object.values(res.data.Data);
    return initialSymbols;
  }
);

export const selectSymbols = (state) => state.symbols;

export default symbolsSlice.reducer;
