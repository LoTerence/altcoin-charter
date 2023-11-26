import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* TODO: dev mode bug
In dev mode, the [initialState.status: "idle"] always makes it so that when a new file is saved, no coins show up.
Fix it so that coinList always shows up */

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
        state.error = "Something went wrong while getting coin list";
      })
      .addCase(addNewCoin.fulfilled, (state, action) => {
        const newCoin = action.payload;
        state.coins.push(newCoin);
        state.error = null;
      })
      .addCase(deleteCoin.fulfilled, (state, action) => {
        const _id = action.payload;
        const coinsArr = state.coins;
        state.coins = coinsArr.filter((c) => c._id !== _id);
        state.error = null;
      });
  },
});

export const { setCoins, setDeletingCoinId, setError } = coinListSlice.actions;

export default coinListSlice.reducer;

// Selector that lets the rest of the app get read access to coinListSlice state
export const selectCoinList = (state) => state.coinList;

// ------------------------------------------------ Async thunks ------------------------------------------------ //
// fetchCoins -- fetch coins from db
export const fetchCoins = createAsyncThunk("coinList/fetchCoins", async () => {
  const res = await axios.get("/coins_public/coinList");
  if (!res.data.success) {
    throw new Error("Something went wrong while getting coin list");
  }
  const coins = res.data.data;
  return coins;
});

// TODO: add by coinname as well as symbol
// addNewCoin -- adds new coin to the db by symbol
export const addNewCoin = createAsyncThunk(
  "coinList/addNewCoin",
  async (newCoinSymbol) => {
    const cryptocompareRes = await axios.get(
      "https://min-api.cryptocompare.com/data/all/coinlist"
    );
    const doesCryptoExist = Boolean(cryptocompareRes.data.Data[newCoinSymbol]);
    if (!doesCryptoExist) {
      throw new Error("A coin with that symbol does not exist");
    }

    const cryptoData = cryptocompareRes.data.Data[newCoinSymbol];
    const newCoin = {
      CoinName: cryptoData.CoinName,
      Id: cryptoData.Id,
      Name: cryptoData.Name,
      Symbol: cryptoData.Symbol,
    };

    const res = await axios.post("/coins_public/coinList", newCoin);
    if (!res.data.success) {
      console.log("error in posting to coins_public in addNewCoin action ");
      throw new Error("There was an error posting new coin data");
    }

    const coin = res.data.data;
    return coin;
  }
);

export const deleteCoin = createAsyncThunk(
  "coinList/deleteCoin",
  async (_id) => {
    const res = await axios.delete(`/coins_public/coinList/${_id}`);
    if (!res.data.success) {
      throw new Error("Something went wrong while deleting coin");
    }
    return _id;
  }
);
