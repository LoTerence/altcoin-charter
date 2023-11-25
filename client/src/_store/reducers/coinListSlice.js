import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// TODO: add ts types for status
// initialState.status options: 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  coins: [],
  deletingCoinId: null,
  error: null,
  reqInProgress: false,
  status: "idle",
};

export const coinListSlice = createSlice({
  name: "coinList",
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    addCoin: (state, action) => {
      const newCoin = action.payload;
      state.coins.push(newCoin);
      state.reqInProgress = false;
      state.error = null;
    },
    deleteCoin: (state, action) => {
      const sym = action.payload;
      const coinsArr = state.coins;
      state.coins = coinsArr.filter((c) => c.Symbol !== sym);
      state.error = null;
    },
    setDeletingCoinId: (state, action) => {
      state.deletingCoinId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.reqInProgress = false;
    },
    setReqInProgress: (state, action) => {
      state.reqInProgress = action.payload;
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
      });
  },
});

export const {
  setCoins,
  addCoin,
  deleteCoin,
  setReqInProgress,
  setDeletingCoinId,
  setError,
} = coinListSlice.actions;

export default coinListSlice.reducer;

// Selector that lets the rest of the app get read access to coinListSlice state
export const selectCoinList = (state) => state.coinList;

// ------------------------------------------------ Async thunks ------------------------------------------------
// fetchCoins -- fetch coins from db
export const fetchCoins = createAsyncThunk("coinList/fetchCoins", async () => {
  const res = await axios.get("/coins_public/coinList");
  if (!res.data.success) {
    throw new Error("Something went wrong while getting coin list");
  }
  return res.data.data;
});

// ADD COIN method
// TODO(if you want): add by coinname as well as symbol
// TODO: refactor axios here. Should separate the verifying the symbol exists and the posting to db into two separate functions
export const addCoinAction = (newCoinSymbol) => (dispatch) => {
  dispatch(setReqInProgress(true));

  const sym = newCoinSymbol.toUpperCase(); //convert newCoinSymbol param to uppercase string

  axios
    .get("https://min-api.cryptocompare.com/data/all/coinlist")
    .then((res) => {
      if (res.data.Data[sym]) {
        //if the symbol represents an altcoin from cryptocompare.com, add the coin to the coinlist db

        const newCoin = {
          Id: res.data.Data[sym].Id,
          Name: res.data.Data[sym].Name,
          Symbol: res.data.Data[sym].Symbol,
          CoinName: res.data.Data[sym].CoinName,
        };

        axios //adding coin to coinlist db
          .post("/coins_public/coinList", newCoin)
          .then((res2) => {
            if (res2.data.success) {
              dispatch(addCoin(newCoin));
            } else {
              dispatch(setError(res2.data.error));
            }
          })
          .catch((err) => {
            dispatch(setError("There was an error fetching new coin data"));
            console.log("error in posting to coins_public in addcoin action: ");
            throw err;
          });
      } else {
        //if symbol doesnt exist, dispatch an error message
        dispatch(setError("A coin with that symbol does not exist"));
      }
    })
    .catch((err) => {
      console.log(
        "error in addCoinAction method api call to cryptocompare.com"
      );
      dispatch(setError("err"));
    });
};

// DELETE COIN
export const deleteCoinAction = (coin, id) => (dispatch) => {
  dispatch(setDeletingCoinId(id));

  const symbol = coin.Symbol;
  axios
    .delete("/coins_public/coinList/" + symbol)
    .then((res) => {
      if (res.data.success) {
        dispatch(deleteCoin(symbol));
      } else {
        dispatch(setError("Something went wrong while deleting coin"));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setError(
          "There was an error deleting from coins_public in deleteCoin action"
        )
      );
    })
    .finally(() => {
      dispatch(setDeletingCoinId(null));
    });
};
