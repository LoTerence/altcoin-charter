import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// TODO: add ts types for status
// initialState.status options: 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  coins: [],
  error: null,
  status: "idle",
};

export const coinListSlice = createSlice({
  name: "coinList",
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoins.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.error?.message ||
          "Something went wrong while getting coin list";
      })
      .addCase(addNewCoin.fulfilled, (state, action) => {
        const newCoin = action.payload;
        state.coins.push(newCoin);
        state.error = null;
      })
      .addCase(deleteCoin.fulfilled, (state, action) => {
        const _id = action.payload;
        state.coins = state.coins.filter((c) => c._id !== _id);
        state.error = null;
      });
  },
});

export const { setCoins, setError, setStatus } = coinListSlice.actions;

// fetchCoins -- fetch coins from db
export const fetchCoins = createAsyncThunk("coinList/fetchCoins", async () => {
  const res = await axios.get("/api/watchlist/public");
  if (!res.data.success) {
    throw new Error("Something went wrong while getting coin list");
  }
  const coins = res.data.data;
  return coins;
});

// TODO: make a function to add by coinname as well as symbol
// addNewCoin -- adds new coin to the db by symbol
export const addNewCoin = createAsyncThunk(
  "coinList/addNewCoin",
  async (newCoinSymbol) => {
    const sym = newCoinSymbol.toUpperCase();
    let cryptocompareRes;
    try {
      cryptocompareRes = await axios.get(
        "https://min-api.cryptocompare.com/data/all/coinlist"
      );
    } catch (err) {
      console.error(err);
      throw new Error("Error: failed to save new coin, please try again later");
    }
    const cryptoData = cryptocompareRes?.data?.Data[sym];
    if (!cryptoData) {
      throw new Error("A coin with that symbol does not exist");
    }
    const data = {
      coinName: cryptoData.CoinName,
      cryptoCompareId: cryptoData.Id,
      name: cryptoData.Name,
      symbol: cryptoData.Symbol,
    };
    const res = await axios.put("/api/watchlist/public", data);
    if (!res.data.success) {
      throw new Error("There was an error posting new coin data");
    }
    const coin = res.data.data;
    return coin;
  }
);

export const deleteCoin = createAsyncThunk(
  "coinList/deleteCoin",
  async (_id) => {
    const res = await axios.delete(`/api/watchlist/public/${_id}`);
    if (!res.data.success) {
      throw new Error("Something went wrong while deleting coin");
    }
    return _id;
  }
);

// Selector that lets the rest of the app get read access to coinListSlice state
export const selectCoinList = (state) => state.coinList;

export default coinListSlice.reducer;
