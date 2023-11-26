// Component for the unordered list of coins: CoinUList
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoins,
  selectCoinList,
} from "../../_store/reducers/coinListSlice";
import CoinLi from "./CoinLi";
import CoinAdder from "./CoinAdder";

// TODO: add a loading overlay

const CoinUList = () => {
  const dispatch = useDispatch();
  const { coins, status } = useSelector(selectCoinList);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  return (
    <>
      {status === "loading" && <p>loading coins..</p>}
      <div className="d-flex flex-wrap">
        {coins.map((coin) => (
          <CoinLi key={coin.Id} coin={coin} />
        ))}
        <CoinAdder />
      </div>
    </>
  );
};

export default CoinUList;
