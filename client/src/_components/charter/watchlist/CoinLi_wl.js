/* 
a <li> element modified to display coins: coinLi 
- like a coin Card
*/
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoinWLAction,
  selectWatchList,
} from "../../../_store/reducers/watchListSlice";
import {
  fetchCoinInfo,
  fetchHistory,
  setActiveCoinId,
  selectHistory,
} from "../../../_store/reducers/historySlice";
import { SpinnerIcon, TrashIcon } from "../../icons";

const CoinLi = ({ coin }) => {
  const dispatch = useDispatch();
  const { activeCoinId, activeTimeframe } = useSelector(selectHistory);
  const { deletingCoinId } = useSelector(selectWatchList);
  const isDeleting = coin.Id === deletingCoinId;
  const isActive = coin.Id === activeCoinId;

  function handleDeleteCoin(e) {
    e.stopPropagation();
    dispatch(deleteCoinWLAction(coin, coin.Id));
  }

  function handleSetActiveCoin(e) {
    e.stopPropagation();
    if (isActive) return;
    dispatch(setActiveCoinId(coin._id));
    dispatch(fetchCoinInfo(coin));
    dispatch(
      fetchHistory({ coinSymbol: coin.Symbol, timeframe: activeTimeframe })
    );
  }

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
