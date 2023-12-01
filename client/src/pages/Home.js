import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartTitle from "../_components/charter/ChartTitle";
import CoinAdder from "../_components/charter/CoinAdder";
import CoinCard from "../_components/charter/CoinCard";
import CoinInfo from "../_components/charter/CoinInfo";
import PriceChart from "../_components/charter/PriceChart";
import TimeFrameList from "../_components/charter/TimeFrameList";
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
    </>
  );
};

export default Home;
