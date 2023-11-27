/**
 * Feature.js
 *
 * Component where the main app will live. Authenticated users can save
 * and view data on a personal watchlist of coins here.
 */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import WatchList from "../_components/charter/watchlist/WatchList";
import PriceChart from "../_components/charter/PriceChart";
import CoinInfo from "../_components/charter/CoinInfo";
import TimeFrameList from "../_components/charter/TimeFrameList";
import ChartTitle from "../_components/charter/ChartTitle";
import PrivateRoute from "../_components/auth/PrivateRoute";

import { setActiveCoinId, setTimeFrame } from "../_store/reducers/historySlice";

export default function Feature() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveCoinId(null));
    dispatch(setTimeFrame("1day"));
  });

  return (
    <PrivateRoute>
      <ChartTitle />
      <TimeFrameList />
      <PriceChart />
      <CoinInfo />
      <WatchList />
    </PrivateRoute>
  );
}
