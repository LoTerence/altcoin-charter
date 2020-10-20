// Component that displays the name and symbol of the active COIN
import React from "react";
import { useSelector } from "react-redux";
import { selectHistData } from "../../_store/reducers/histDataSlice";

const CoinNameInfo = () => {
  const activeCoin = useSelector(selectHistData).activeCoin;
  const activeTimeframe = useSelector(selectHistData).activeTimeframe;

  if (!activeCoin || !activeCoin.Name) {
    return <h1>Chart</h1>;
  }

  return (
    <h1>
      {activeCoin.CoinName} - {activeCoin.Symbol} - {activeTimeframe}
    </h1>
  );
};

export default CoinNameInfo;
