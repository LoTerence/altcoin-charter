// TODO: bug: typing and pressing enter does not clear the suggestions dropdown
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoin, setError } from "../../_store/reducers/coinListSlice";
import {
  fetchCoinInfo,
  fetchHistory,
  setActiveCoinId,
  selectHistory,
} from "../../_store/reducers/historySlice";
import { SpinnerIcon, TrashIcon } from "../icons";

const CoinLi = ({ coin }) => {
  const dispatch = useDispatch();
  const { activeCoinId, activeTimeframe } = useSelector(selectHistory);
  const [deleteReqStatus, setDeleteReqStatus] = useState("idle");
  const isActive = coin._id === activeCoinId;

  const handleDeleteCoin = async (e) => {
    e.stopPropagation();
    try {
      setDeleteReqStatus("pending");
      await dispatch(deleteCoin(coin._id)).unwrap();
    } catch (err) {
      console.error("Failed to delete the coin: ", err);
      setError("Something went wrong while deleting coin");
    } finally {
      setDeleteReqStatus("idle");
    }
  };

  const handleSetActiveCoin = (e) => {
    e.stopPropagation();
    if (isActive) return;
    dispatch(setActiveCoinId(coin._id));
    dispatch(fetchCoinInfo(coin.symbol));
    dispatch(
      fetchHistory({ coinSymbol: coin.symbol, timeframe: activeTimeframe })
    );
  };

  return (
    <div className="col-md-4 col-sm-6 col-12 relative">
      <button
        className={isActive ? "coin-li-isActive" : "coin-li"}
        tabIndex="0"
        onClick={(e) => handleSetActiveCoin(e)}
      >
        <h5>{coin.name}</h5>
        <p>{coin.coinName} price history, day&apos;s change</p>
      </button>
      <DeleteButton
        isLoading={deleteReqStatus === "pending"}
        onClick={handleDeleteCoin}
      />
    </div>
  );
};

const DeleteButton = ({ isLoading, onClick }) => {
  return (
    <button
      className="remove-icon"
      onClick={(e) => onClick(e)}
      disabled={isLoading}
    >
      {isLoading ? <SpinnerIcon className="w-16" /> : <TrashIcon />}
    </button>
  );
};

export default CoinLi;
