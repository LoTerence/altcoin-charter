import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CoinUList from "../_components/charter/CoinUList";
import PriceChart from "../_components/charter/PriceChart";
import CoinInfo from "../_components/charter/CoinInfo";
import TimeFrameList from "../_components/charter/TimeFrameList";
import ChartTitle from "../_components/charter/ChartTitle";
import { setActiveCoinId, setTimeFrame } from "../_store/reducers/historySlice";

const Home = () => {
  const dispatch = useDispatch();

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
      <CoinUList />
    </>
  );
};

export default Home;
