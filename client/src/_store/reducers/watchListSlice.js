/* 
This is the Redux state slice for state related to the personal watchlist of a user
*/
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCoinDetails } from "../../lib/cryptocompareAPI";

const initialState = {
  coins: [],
  error: null,
  status: "idle",
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong while getting personal watch list";
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

export const { setCoins, setError } = watchListSlice.actions;

// get initial personal watch list from the db
export const fetchWatchlist = createAsyncThunk(
  "watchList/fetchWatchlist",
  async () => {
    const res = await axios.get("/api/users/watchlist", {
      headers: { authorization: localStorage.getItem("token") },
    });
    if (!res.data.success) {
      throw new Error("Something went wrong while getting user watch list");
    }
    const watchlist = res.data.data;
    return watchlist;
  }
);

export const addNewCoin = createAsyncThunk(
  "watchList/addNewCoin",
  async (newCoinSymbol) => {
    const SYM = newCoinSymbol.toUpperCase();
    const coinFound = await getCoinDetails({ fromSymbol: SYM });

    const newCoin = {
      coinName: coinFound.CoinName,
      cryptoCompareId: coinFound.Id,
      name: coinFound.Name,
      symbol: coinFound.Symbol,
    };
    const config = {
      headers: { authorization: localStorage.getItem("token") },
    };

    const res = await axios.put("/api/users/watchlist/add", newCoin, config);
    if (!res.data.success) {
      throw new Error(res.data.error);
    }

    const coin = res.data.data;
    return coin;
  }
);

// remove coin from user's personal watchlist
export const deleteCoin = createAsyncThunk(
  "watchList/deleteCoin",
  async (_id) => {
    const res = await axios.put(
      "/api/users/watchlist/delete",
      { id: _id },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    if (!res.data.success) {
      throw new Error("Something went wrong while deleting coin");
    }
    return _id;
  }
);

export const selectWatchList = (state) => state.watchList;

export default watchListSlice.reducer;
