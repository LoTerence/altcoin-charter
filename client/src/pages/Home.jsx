import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartTitle from "../_components/charter/ChartTitle";
import CoinAdder from "../_components/charter/CoinAdder";
import CoinCard from "../_components/charter/CoinCard";
import CoinInfo from "../_components/charter/CoinInfo";
import PriceChart from "../_components/charter/PriceChart";
import TimeFrameList from "../_components/charter/TimeFrameList";
import Loading from "../_components/universal/Loading";
import {
  addNewCoin,
  deleteCoin,
  fetchCoins,
  selectCoinList,
  setError,
} from "../_store/reducers/coinListSlice";
import { setActiveCoinId, setTimeFrame } from "../_store/reducers/historySlice";

const Home = () => {
  const dispatch = useDispatch();
  const { coins, status, error } = useSelector(selectCoinList);
  const isLoading = status === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoins());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(setActiveCoinId(null));
    dispatch(setTimeFrame("1day"));
  }, [dispatch]);

  return (
    <>
      <ChartTitle />
      <TimeFrameList />
      <PriceChart />
      <CoinInfo />
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

export default Home;
