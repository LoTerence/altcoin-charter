/* feature.js
 *  component where the main app will live. Authenticated users can save
 * and view data on a personal watchlist of coins here.
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import WatchList from "../_components/charter/watchlist/WatchList";
import PriceChart from "../_components/charter/PriceChart";
import CoinInfo from "../_components/charter/CoinInfo";
import TimeFrameList from "../_components/charter/TimeFrameList";
import CoinNameInfo from "../_components/charter/CoinNameInfo";
import PrivateRoute from "../_components/auth/PrivateRoute";

import { setActiveCoin, setTimeFrame } from "../_store/reducers/histDataSlice";

export default function Feature() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveCoin({}));
    dispatch(setTimeFrame("1day"));
  });

  return (
    <PrivateRoute>
      <CoinNameInfo />
      <TimeFrameList />
      <PriceChart />
      <CoinInfo />
      <WatchList />
    </PrivateRoute>
  );
}
