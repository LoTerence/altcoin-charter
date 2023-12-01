import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchlist,
  selectWatchList,
} from "../../../_store/reducers/watchListSlice";
import CoinLi from "./CoinLi_wl";
import CoinAdder from "./CoinAdder_wl";

const WatchList = () => {
  const dispatch = useDispatch();
  const { coins, status } = useSelector(selectWatchList);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, status]);

  return (
    <>
      {status === "loading" && <p>loading coins..</p>}
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
