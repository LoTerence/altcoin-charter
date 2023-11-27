/**
 * charter.js
 * container for the application
 */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CoinUList from "./CoinUList";
import PriceChart from "./PriceChart";
import CoinInfo from "./CoinInfo";
import TimeFrameList from "./TimeFrameList";
import ChartTitle from "./ChartTitle";
import {
  setActiveCoinId,
  setTimeFrame,
} from "../../_store/reducers/historySlice";

export default function Charter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveCoinId(null));
    dispatch(setTimeFrame("1day"));
  });

  return (
    <>
      <ChartTitle />
      <TimeFrameList />
      <PriceChart />
      <CoinInfo />
      <CoinUList />
    </>
  );
}
