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
    dispatch(fetchCoinInfo(coin.Symbol));
    dispatch(
      fetchHistory({ coinSymbol: coin.Symbol, timeframe: activeTimeframe })
    );
  }

  return (
    <div className="col-md-4 col-sm-6 col-12">
      <button
        className={isActive ? "coin-li-active" : "coin-li"}
        tabIndex="0"
        onClick={(e) => handleSetActiveCoin(e)}
      >
        <div>
          <h5>{coin.Name}</h5>
          <p>{coin.CoinName} price history, day&apos;s change</p>
        </div>
        {isDeleting ? (
          <SpinnerIcon className="w-16 remove-icon" />
        ) : (
          <button className="remove-icon" onClick={(e) => handleDeleteCoin(e)}>
            <TrashIcon />
          </button>
        )}
      </button>
    </div>
  );
};

export default CoinLi;
