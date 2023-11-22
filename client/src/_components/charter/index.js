/**
 * charter.js
 * container for the application
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../universal/Layout";

import CoinUList from "./CoinUList";
import PriceChart from "./PriceChart";
import CoinInfo from "./CoinInfo";
import TimeFrameList from "./TimeFrameList";
import CoinNameInfo from "./CoinNameInfo";

import {
  setActiveCoin,
  setTimeFrame,
} from "../../_store/reducers/histDataSlice";

export default function Charter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveCoin({}));
    dispatch(setTimeFrame("1day"));
  });

  return (
    <Layout>
      <CoinNameInfo />
      <TimeFrameList />
      <PriceChart />
      <CoinInfo />
      <CoinUList />
    </Layout>
  );
}
