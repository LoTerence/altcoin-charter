import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoins,
  selectCoinList,
} from "../../_store/reducers/coinListSlice";
import CoinLi from "./CoinLi";
import CoinAdder from "./CoinAdder";

const CoinUList = () => {
  const dispatch = useDispatch();
  const { coins, status } = useSelector(selectCoinList);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoins());
    }
  }, [dispatch, status]);

  return (
    <>
      {status === "loading" && <p>loading coins..</p>}
      <div className="d-flex flex-wrap">
        {coins.map((coin) => (
          <CoinLi key={coin._id} coin={coin} />
        ))}
        <CoinAdder />
      </div>
    </>
  );
};

export default CoinUList;
