/* 
This is the Redux state slice for state related to the personal watchlist of a user
*/

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setDeletingCoinId } from "./coinListSlice";

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    coins: [],
    reqInProgress: false,
    deletingCoinId: "",
    error: "",
  },
  reducers: {
    setCoinsWL: (state, action) => {
      state.coins = action.payload;
    },
    addCoinWL: (state, action) => {
      const newCoin = action.payload;
      state.coins.push(newCoin);
      state.reqInProgress = false;
      state.error = "";
    },
    deleteCoinWL: (state, action) => {
      const sym = action.payload;
      const coinsArr = state.coins;
      state.coins = coinsArr.filter((c) => c.Symbol !== sym);
      state.error = "";
    },
    setReqInProgressWL: (state, action) => {
      state.reqInProgress = action.payload;
    },
    setDeletingCoinIdWL: (state, action) => {
      state.deletingCoinId = action.payload;
    },
    coinErrWL: (state, action) => {
      state.error = action.payload;
      state.reqInProgress = false;
    },
  },
});

export const {
  setCoinsWL,
  addCoinWL,
  deleteCoinWL,
  setReqInProgressWL,
  setDeletingCoinIdWL,
  coinErrWL,
} = watchListSlice.actions;

// Async thunks
// getCoins action
export const getCoinsWLAction = () => (dispatch) => {
  axios
    .get("/users/watchlist", {
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(setCoinsWL(res.data));
    })
    .catch((err) =>
      dispatch(
        coinErrWL("Error, something went wrong in watchlist-getCoins action")
      )
    );
};

// adding a coin to watchlist action
export const addCoinWLAction = (newCoinSymbol) => (dispatch) => {
  dispatch(setReqInProgressWL(true));

  const sym = newCoinSymbol.toUpperCase();

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

        axios
          .put(
            "/users/watchlist/addcoin",
            { newCoin },
            {
              headers: { authorization: localStorage.getItem("token") },
            }
          )
          .then((res2) => {
            if (res2.data.success) {
              dispatch(addCoinWL(newCoin));
            } else {
              dispatch(coinErrWL(res2.data.msg));
            }
          })
          .catch((err) => {
            console.log("Error in putting to watchlist in addcoinWL action");
            dispatch(
              coinErrWL("Server Error occured while adding to watchlist")
            );
          });
      } else {
        //if symbol doesnt exist, dispatch an error message
        dispatch(coinErrWL("A coin with that symbol does not exist"));
      }
    })
    .catch((err) => {
      console.log("Error in addcoinWL action api call to cryptocompare.com");
      dispatch(
        coinErrWL("Error in addcoinWL action api call to cryptocompare.com")
      );
    });
};

// Delete coin from watchlist action
export const deleteCoinWLAction = (coin, id) => (dispatch) => {
  dispatch(setDeletingCoinIdWL(id));

  const sym = coin.Symbol;
  console.log("Deleting coin: " + sym);
  axios
    .put(
      "/users/watchlist/delcoin",
      { Symbol: sym },
      { headers: { authorization: localStorage.getItem("token") } }
    )
    .then((res) => {
      if (res.data.success) {
        dispatch(deleteCoinWL(sym));
        dispatch(setDeletingCoinIdWL(""));
      } else {
        dispatch(coinErrWL(res.data.msg));
        dispatch(setDeletingCoinIdWL(""));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(coinErrWL("There was a server error while putting to delcoin"));
      dispatch(setDeletingCoinIdWL(""));
    });
};

export const selectWatchList = (state) => state.watchList;

export default watchListSlice.reducer;
