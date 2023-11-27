/* 
a <li> element modified to display coins: coinLi 
- like a coin Card
*/
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
    dispatch(fetchCoinInfo(coin));
    dispatch(
      fetchHistory({ coinSymbol: coin.Symbol, timeframe: activeTimeframe })
    );
  };

  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div className={isActive ? "coin-li-active" : "coin-li"} tabIndex="0">
        <div onClick={(e) => handleSetActiveCoin(e)}>
          <h5>{coin.Name}</h5>
          <p>{coin.CoinName} price history, day's change</p>
        </div>
        <DeleteButton
          isLoading={deleteReqStatus === "pending"}
          onClick={handleDeleteCoin}
        />
      </div>
    </div>
  );
};

const DeleteButton = ({ isLoading, onClick }) => {
  return (
    <>
      {isLoading ? (
        <SpinnerIcon className="w-16 remove-icon" />
      ) : (
        <span className="remove-icon" onClick={(e) => onClick(e)}>
          <TrashIcon />
        </span>
      )}
    </>
  );
};

export default CoinLi;
