/* watchList.js
 *  Component that shows an unordered list of coins from the authenticated user's
 * personal watchlist
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchlist,
  selectWatchList,
} from "../../../_store/reducers/watchListSlice";
import { getProfile, selectAuth } from "../../../_store/reducers/authSlice";
import CoinLi from "./CoinLi_wl";
import CoinAdder from "./CoinAdder_wl";

const WatchList = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(selectAuth);
  const { coins } = useSelector(selectWatchList);

  useEffect(() => {
    dispatch(fetchWatchlist());
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <p>
        <b>{userProfile.email}</b>
      </p>
      <p>
        Your personal watchlist of coins: Coins you add to this list will be
        saved to your account
      </p>
      <div className="d-flex flex-wrap">
        {coins.map((coin) => (
          <CoinLi key={coin._id} coin={coin} />
        ))}
        <CoinAdder />
      </div>
    </>
  );
};

export default WatchList;
