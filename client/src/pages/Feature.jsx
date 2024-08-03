/**
 * Component where the main app will live. Authenticated users can save
 * and view data on a personal watchlist of coins here.
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartTitle from "../_components/charter/ChartTitle";
import CoinAdder from "../_components/charter/CoinAdder";
import CoinCard from "../_components/charter/CoinCard";
import CoinInfo from "../_components/charter/CoinInfo";
import PriceChart from "../_components/charter/PriceChart";
import TimeFrameList from "../_components/charter/TimeFrameList";
import Loading from "../_components/universal/Loading";
import { selectAuth } from "../_store/reducers/authSlice";
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
  const isLoading = status === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, status]);

  return (
    <>
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
      <div className="d-flex flex-wrap">
        {isLoading && (
          <div
            className="position-relative w-100 p-3"
            style={{ height: "94px" }}
          >
            <p>Loading coins..</p>
            <Loading />
          </div>
        )}
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
    </>
  );
};

export default Feature;
