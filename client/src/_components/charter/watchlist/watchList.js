/* watchList.js
 *  Component that shows an unordered list of coins from the authenticated user's
 * personal watchlist
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCoinsWLAction,
  selectWatchList,
} from "../../../_store/reducers/watchListSlice";
import { getProfile, selectAuth } from "../../../_store/reducers/authSlice";

import CoinLi from "./CoinLi_wl";
import CoinAdder from "./CoinAdder_wl";

const WatchList = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectAuth).message;
  const coins = useSelector(selectWatchList).coins;

  useEffect(() => {
    console.log("Using effect in watchlist");
    dispatch(getCoinsWLAction());
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div>
      <p>
        <b>{profile}</b>
      </p>
      <p>
        Your personal watchlist of coins: Coins you add to this list will be
        saved to your account
      </p>
      {coins.map((coin) => (
        <CoinLi key={coin.Id} coin={coin} />
      ))}
      <CoinAdder />
    </div>
  );
};

export default WatchList;
