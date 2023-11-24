/* 
a <li> element modified to display coins: coinLi 
- like a coin Card
*/
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoinAction,
  selectCoinList,
} from "../../_store/reducers/coinListSlice";
import {
  getCoinData,
  getHistData,
  setActiveCoin,
  selectHistData,
} from "../../_store/reducers/histDataSlice";
import { SpinnerIcon, TrashIcon } from "../icons";

const CoinLi = ({ coin }) => {
  const dispatch = useDispatch();
  const { deletingCoinId } = useSelector(selectCoinList);
  const { activeCoin, activeTimeframe } = useSelector(selectHistData);
  const isDeleting = coin.Id === deletingCoinId;
  const isActive = coin.Id == activeCoin.Id;

  const handleDeleteCoin = (e) => {
    e.stopPropagation();
    dispatch(deleteCoinAction(coin, coin.Id));
  };

  const handleSetActiveCoin = (e) => {
    e.stopPropagation();
    if (isActive) return;
    dispatch(setActiveCoin(coin));
    dispatch(getCoinData(coin));
    dispatch(getHistData(coin, activeTimeframe));
  };

  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div className={isActive ? "coin-li-active" : "coin-li"} tabIndex="0">
        <div onClick={(e) => handleSetActiveCoin(e)}>
          <h5>{coin.Name}</h5>
          <p>{coin.CoinName} price history, day's change</p>
        </div>
        {isDeleting ? (
          <SpinnerIcon className="w-16 remove-icon" />
        ) : (
          <span className="remove-icon" onClick={(e) => handleDeleteCoin(e)}>
            <TrashIcon />
          </span>
        )}
      </div>
    </div>
  );
};

export default CoinLi;
