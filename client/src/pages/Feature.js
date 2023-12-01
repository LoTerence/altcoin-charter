/**
 * Feature.js
 *
 * Component where the main app will live. Authenticated users can save
 * and view data on a personal watchlist of coins here.
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WatchList from "../_components/charter/watchlist/WatchList";
import PriceChart from "../_components/charter/PriceChart";
import CoinInfo from "../_components/charter/CoinInfo";
import TimeFrameList from "../_components/charter/TimeFrameList";
import ChartTitle from "../_components/charter/ChartTitle";
import PrivateRoute from "../_components/auth/PrivateRoute";
import { getProfile, selectAuth } from "../_store/reducers/authSlice";

import { setActiveCoinId, setTimeFrame } from "../_store/reducers/historySlice";

const Feature = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(setActiveCoinId(null));
    dispatch(setTimeFrame("1day"));
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <ChartTitle />
      <TimeFrameList />
      <PriceChart />
      <CoinInfo />
      <p>
        <b>{userProfile.email}</b>
      </p>
      <p>
        Your personal watchlist of coins: Coins you add to this list will be
        saved to your account
      </p>
      <WatchList />
    </PrivateRoute>
  );
};

export default Feature;
