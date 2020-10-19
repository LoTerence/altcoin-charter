import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const coinListSlice = createSlice({
  name: "coinList",
  initialState: {
    coins: [],
  },
  reducers: {
    getCoins: (state, action) => {
      state.coins = action.payload;
    },
    addCoin: (state, action) => {
      const newCoin = action.payload;
      state.coins.push(newCoin);
      state.error = "";
    },
    deleteCoin: (state, action) => {
      const sym = action.payload;
      const coinsArr = state.coins;
      state.coins = coinsArr.filter((c) => c.Symbol !== sym);
      state.error = "";
    },
    coinErr: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getCoins, addCoin, deleteCoin, coinErr } = coinListSlice.actions;

// Async thunks
// GET COINS -- action creator that sends a list of coins from db to reducer/state
export const getCoinsAction = () => (dispatch) => {
  axios
    .get("/coins_unauth/coinList")
    .then((res) => {
      if (res.data.success) {
        dispatch(getCoins(res.data.data));
      } else {
        dispatch(coinErr("Something went wrong while getting coin list"));
      }
    })
    .catch((err) => {
      dispatch(coinErr("Something went wrong while getting coin list"));
    });
};

// ADD COIN method
//TODO(if you want) add by coinname as well as symbol
export const addCoinAction = (newCoinSymbol) => (dispatch) => {
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
          .post("/coins_unauth/coinList", newCoin)
          .then((res2) => {
            console.log("Adding coin: " + sym);
            if (res2.data.success) {
              dispatch(addCoin(newCoin));
            } else {
              dispatch(coinErr(res2.data.error));
            }
          })
          .catch((err) => {
            console.log("error in posting to coins_unauth in addcoin action: ");
            throw err;
          });
      } else {
        //if symbol doesnt exist, dispatch an error message
        dispatch(coinErr("A coin with that symbol does not exist"));
      }
    })
    .catch((err) => {
      console.log("error in addCoin method api call to cryptocompare.com ");
      dispatch(coinErr("err"));
    });
};

// DELETE COIN
export const deleteCoinAction = (coin) => (dispatch) => {
  const sym = coin.Symbol;
  console.log("Deleting coin: " + sym);
  axios
    .delete("/coins_unauth/coinList/" + sym)
    .then((res) => {
      if (res.data.success) {
        dispatch(deleteCoin(sym));
      } else {
        dispatch(coinErr("Something went wrong while deleting coin"));
      }
    })
    .catch((err) => {
      console.log(err);
      coinErr(
        "There was an error deleting from coins_unauth in deleteCoin action"
      );
    });
};

// Selector that lets the rest of the app get read access to coinListSlice state
export const selectCoinList = (state) => state.coinList;

export default coinListSlice.reducer;
