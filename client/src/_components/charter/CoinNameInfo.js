// Component that displays the name and symbol of the active COIN
import { useSelector } from "react-redux";
import { selectHistData } from "../../_store/reducers/histDataSlice";

const CoinNameInfo = () => {
  const { activeCoin, activeTimeframe } =
    useSelector(selectHistData).activeCoin;

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
