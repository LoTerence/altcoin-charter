/* 
This is the Redux state slice for state related to the personal watchlist of a user
*/
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    coins: [],
    error: null,
    status: "idle",
  },
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.reqInProgress = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWatchlist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
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

// Async thunks
// get initial personal watch list from the db
export const fetchWatchlist = createAsyncThunk(
  "watchList/fetchWatchlist",
  async () => {
    const res = await axios.get("/users/watchlist", {
      headers: { authorization: localStorage.getItem("token") },
    });
    const watchlist = res.data;
    return watchlist;
  }
);

// add a new coin to user's personal watchlist
// todo: refactor get call to https://min-api.cryptocompare.com/data/all/coinlist, its repeated a lot in the app
export const addNewCoin = createAsyncThunk(
  "watchList/addNewCoin",
  async (newCoinSymbol) => {
    const sym = newCoinSymbol.toUpperCase();
    const cryptocompareRes = await axios.get(
      "https://min-api.cryptocompare.com/data/all/coinlist"
    );

    if (cryptocompareRes.data.Data[sym]) {
      const cryptoData = cryptocompareRes.data.Data[sym];
      const data = {
        cryptoCompareId: cryptoData.Id,
        name: cryptoData.Name,
        symbol: cryptoData.Symbol,
        coinName: cryptoData.CoinName,
      };

      const res = await axios.put(
        "/users/watchlist/add",
        { data },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.error);
      }

      return res.data.newCoin;
    }
  }
);

// remove coin from user's personal watchlist
export const deleteCoin = createAsyncThunk(
  "watchList/deleteCoin",
  async (_id) => {
    const res = await axios.put(
      "/users/watchlist/delete",
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
