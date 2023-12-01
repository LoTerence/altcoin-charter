/**
 * Feature.js
 *
 * Component where the main app will live. Authenticated users can save
 * and view data on a personal watchlist of coins here.
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "../_components/auth/PrivateRoute";
import ChartTitle from "../_components/charter/ChartTitle";
import CoinAdder from "../_components/charter/CoinAdder";
import CoinCard from "../_components/charter/CoinCard";
import CoinInfo from "../_components/charter/CoinInfo";
import PriceChart from "../_components/charter/PriceChart";
import TimeFrameList from "../_components/charter/TimeFrameList";
import { getProfile, selectAuth } from "../_store/reducers/authSlice";
import { setActiveCoinId, setTimeFrame } from "../_store/reducers/historySlice";
import {
  addNewCoin,
  deleteCoin,
  fetchWatchlist,
  selectWatchList,
  setError,
} from "../_store/reducers/watchListSlice";

const Feature = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(selectAuth);
  const { coins, status, error } = useSelector(selectWatchList);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // TODO: should do a auth slice status: idle for getting profile
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setActiveCoinId(null));
    dispatch(setTimeFrame("1day"));
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
      {status === "loading" && <p>loading coins..</p>}
      <div className="d-flex flex-wrap">
        {coins.map((coin) => (
          <CoinCard
            key={coin._id}
            coin={coin}
            deleteCoin={deleteCoin}
            setError={setError}
          />
        ))}
        <CoinAdder
          addNewCoin={addNewCoin}
          coins={coins}
          error={error}
          setError={setError}
        />
      </div>
    </PrivateRoute>
  );
};

export default Feature;
