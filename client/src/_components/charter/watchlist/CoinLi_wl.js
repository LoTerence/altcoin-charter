// a <li> element modified to display coins: coinLi
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoinWLAction,
  selectWatchList,
} from "../../../_store/reducers/watchListSlice";
import {
  getCoinData,
  getHistData,
  setActiveCoin,
  selectHistData,
} from "../../../_store/reducers/histDataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const CoinLi = (props) => {
  const dispatch = useDispatch();
  const tf = useSelector(selectHistData).activeTimeframe;
  const deletingCoinId = useSelector(selectWatchList).deletingCoinId;
  const activeCoin = useSelector(selectHistData).activeCoin;
  const COIN = props.coin;

  const removeIcon = <FontAwesomeIcon icon={faTrashAlt} />;

  function handleDeleteCoin() {
    dispatch(deleteCoinWLAction(COIN, COIN.Id));
  }

  function handleSetActiveCoin() {
    dispatch(setActiveCoin(COIN));
    dispatch(getCoinData(COIN));
    dispatch(getHistData(COIN, tf));
  }

  function renderDeleteButton() {
    if (COIN.Id === deletingCoinId) {
      return (
        <FontAwesomeIcon icon={faCircleNotch} className="remove-icon fa-spin" />
      );
    }

    return (
      <span className="remove-icon" onClick={() => handleDeleteCoin()}>
        {removeIcon}
      </span>
    );
  }

  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div
        className={COIN == activeCoin ? "coin-li-active" : "coin-li"}
        tabIndex="0"
      >
        <div onClick={() => handleSetActiveCoin()}>
          <h5>{COIN.Name}</h5>
          <p>{COIN.CoinName} price history, day's change</p>
        </div>
        {renderDeleteButton()}
      </div>
    </div>
  );
};

export default CoinLi;
