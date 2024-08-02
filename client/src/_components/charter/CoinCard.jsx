import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharterData,
  fetchCoinInfo,
  fetchHistory,
  setActiveCoinId,
  selectHistory,
} from "../../_store/reducers/historySlice";
import { SpinnerIcon, TrashIcon } from "../icons";

const CoinCard = ({ coin, deleteCoin, setError }) => {
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
      dispatch(setError("Something went wrong while deleting coin"));
    } finally {
      setDeleteReqStatus("idle");
    }
  };

  const handleSetActiveCoin = (e) => {
    e.stopPropagation();
    if (isActive) return;
    dispatch(setActiveCoinId(coin._id));
    /* 
    dispatch(fetchCoinInfo(coin.symbol));
    dispatch(
      fetchHistory({ coinSymbol: coin.symbol, timeframe: activeTimeframe })
    );
    */

    // TODO: fetchCharterData should fetch both info and history
    dispatch(fetchCharterData({ coin, timeframe: activeTimeframe }));
  };

  return (
    <div className="col-md-4 col-sm-6 col-12 position-relative">
      <button
        className="coin-li"
        disabled={isActive}
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
      aria-label="Remove coin"
      className="remove-icon"
      onClick={(e) => onClick(e)}
      disabled={isLoading}
    >
      {isLoading ? <SpinnerIcon className="w-16" /> : <TrashIcon />}
    </button>
  );
};

export default CoinCard;
