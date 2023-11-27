/* 
This is the Redux state slice for state related to the personal watchlist of a user
*/
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    coins: [],
    // reqInProgress: false,
    // deletingCoinId: "",
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
    // addCoinWL: (state, action) => {
    //   const newCoin = action.payload;
    //   state.coins.push(newCoin);
    //   state.reqInProgress = false;
    //   state.error = "";
    // },
    // deleteCoinWL: (state, action) => {
    //   const sym = action.payload;
    //   const coinsArr = state.coins;
    //   state.coins = coinsArr.filter((c) => c.Symbol !== sym);
    //   state.error = "";
    // },
    // setReqInProgressWL: (state, action) => {
    //   state.reqInProgress = action.payload;
    // },
    // setDeletingCoinIdWL: (state, action) => {
    //   state.deletingCoinId = action.payload;
    // },
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
        state.coins = action.payload;
        state.error = null;
      })
      .addCase(deleteCoin.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.error = null;
      });
  },
});

export const {
  setCoins,
  setError,
  // addCoinWL,
  // deleteCoinWL,
  // setReqInProgressWL,
  // setDeletingCoinIdWL,
} = watchListSlice.actions;

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

// todo: refactor get call to https://min-api.cryptocompare.com/data/all/coinlist, its repeated a lot in the app
export const addNewCoin = createAsyncThunk(
  "watchList/addNewCoin",
  async (newCoinSymbol) => {
    const sym = newCoinSymbol.toUpperCase();
    const cryptocompareRes = await axios.get(
      "https://min-api.cryptocompare.com/data/all/coinlist"
    );

    if (cryptocompareRes.data.Data[sym]) {
      //if the symbol represents an altcoin from cryptocompare.com, add the coin to the coinlist db
      const cryptoData = cryptocompareRes.data.Data[sym];
      const newCoin = {
        Id: cryptoData.Id,
        Name: cryptoData.Name,
        Symbol: cryptoData.Symbol,
        CoinName: cryptoData.CoinName,
      };

      const res = await axios.put(
        "/users/watchlist/addcoin",
        { newCoin },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.msg);
      }

      return res.data.newWatchList;
    }
  }
);

// adding a coin to watchlist action
/* export const addCoinWLAction = (newCoinSymbol) => (dispatch) => {
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
              dispatch(setError(res2.data.msg));
            }
          })
          .catch((err) => {
            console.log("Error in putting to watchlist in addcoinWL action");
            dispatch(
              setError("Server Error occured while adding to watchlist")
            );
          });
      } else {
        //if symbol doesnt exist, dispatch an error message
        dispatch(setError("A coin with that symbol does not exist"));
      }
    })
    .catch((err) => {
      console.log("Error in addcoinWL action api call to cryptocompare.com");
      dispatch(
        setError("Error in addcoinWL action api call to cryptocompare.com")
      );
    });
}; */

export const deleteCoin = createAsyncThunk(
  "watchList/deleteCoin",
  async (coinId) => {
    const res = await axios.put(
      "/users/watchlist/delcoin",
      { Id: coinId },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    if (!res.data.success) {
      throw new Error(res.data.msg);
    }
    return res.data.newWatchList;
  }
);

// Delete coin from watchlist action
/* export const deleteCoinWLAction = (coin, id) => (dispatch) => {
  // dispatch(setDeletingCoinIdWL(id));

  // const sym = coin.Symbol;
  // console.log("Deleting coin: " + sym);
  axios
    .put(
      "/users/watchlist/delcoin",
      { Symbol: sym },
      { headers: { authorization: localStorage.getItem("token") } }
    )
    .then((res) => {
      if (res.data.success) {
        dispatch(deleteCoinWL(sym));
      } else {
        dispatch(setError(res.data.msg));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(setError("There was a server error while putting to delcoin"));
    })
    .finally(() => {
      dispatch(setDeletingCoinIdWL(""));
    });
}; */

export const selectWatchList = (state) => state.watchList;

export default watchListSlice.reducer;
