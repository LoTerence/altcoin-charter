/* 
a <li> element modified to display coins: coinLi 
- like a coin Card
*/
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoinThunk, setError } from "../../_store/reducers/coinListSlice";
import {
  getCoinData,
  getHistData,
  setActiveCoin,
  selectHistData,
} from "../../_store/reducers/histDataSlice";
import { SpinnerIcon, TrashIcon } from "../icons";

const CoinLi = ({ coin }) => {
  const dispatch = useDispatch();
  const { activeCoin, activeTimeframe } = useSelector(selectHistData);
  const isActive = coin.Id == activeCoin.Id;
  const [deleteReqStatus, setDeleteReqStatus] = useState("idle");

  const handleDeleteCoin = async (e) => {
    e.stopPropagation();
    try {
      setDeleteReqStatus("pending");
      await dispatch(deleteCoinThunk(coin)).unwrap();
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
