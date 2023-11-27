import { useSelector } from "react-redux";
import { selectCoinList } from "../../_store/reducers/coinListSlice";
import { selectHistory } from "../../_store/reducers/historySlice";

const useActiveCoin = () => {
  const { coins } = useSelector(selectCoinList);
  const { activeCoinId } = useSelector(selectHistory);

  const activeCoin = coins.find((c) => c._id === activeCoinId);

  return activeCoin;
};

export default useActiveCoin;
