import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const coinListSlice = createSlice({
  name: "coinList",
  initialState: {
    coins: [],
    reqInProgress: false,
    deletingCoinId: "",
    error: "",
  },
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    addCoin: (state, action) => {
      const newCoin = action.payload;
      state.coins.push(newCoin);
      state.reqInProgress = false;
      state.error = "";
    },
    deleteCoin: (state, action) => {
      const sym = action.payload;
      const coinsArr = state.coins;
      state.coins = coinsArr.filter((c) => c.Symbol !== sym);
      state.error = "";
    },
    setReqInProgress: (state, action) => {
      state.reqInProgress = action.payload;
    },
    setDeletingCoinId: (state, action) => {
      state.deletingCoinId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.reqInProgress = false;
    },
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

// Async thunks
// GET COINS -- action creator that sends a list of coins from db to reducer/state
export const getCoinsAction = () => (dispatch) => {
  axios
    .get("/coins_public/coinList")
    .then((res) => {
      if (res.data.success) {
        dispatch(setCoins(res.data.data));
      } else {
        dispatch(setError("Something went wrong while getting coin list"));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(setError("Something went wrong while getting coin list"));
    });
};

// ADD COIN method
// TODO(if you want): add by coinname as well as symbol
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
      console.log("error in addCoin method api call to cryptocompare.com ");
      dispatch(setError("err"));
    });
};

// DELETE COIN
export const deleteCoinAction = (coin, id) => (dispatch) => {
  dispatch(setDeletingCoinId(id));

  const sym = coin.Symbol;
  axios
    .delete("/coins_public/coinList/" + sym)
    .then((res) => {
      if (res.data.success) {
        dispatch(deleteCoin(sym));
        dispatch(setDeletingCoinId(""));
      } else {
        dispatch(setError("Something went wrong while deleting coin"));
        dispatch(setDeletingCoinId(""));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        setError(
          "There was an error deleting from coins_public in deleteCoin action"
        )
      );
      dispatch(setDeletingCoinId(""));
    });
};
