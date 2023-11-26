// Component that displays the name and symbol of the active COIN
import { useSelector } from "react-redux";
import { selectHistory } from "../../_store/reducers/historySlice";

const CoinNameInfo = () => {
  const { activeCoin, activeTimeframe } = useSelector(selectHistory);

  if (!activeCoin || !activeCoin.CoinName) {
    return <h1>Chart</h1>;
  }

  return (
    <h1>
      {activeCoin.CoinName} - {activeCoin.Symbol} - {activeTimeframe}
    </h1>
  );
};

export default CoinNameInfo;
