// a <li> element modified to display coins: coinLi
import React from "react";
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

function CoinLi(props) {
  const dispatch = useDispatch();
  const tf = useSelector(selectHistData).activeTimeframe;
  const deletingCoinId = useSelector(selectCoinList).deletingCoinId;
  const activeCoin = useSelector(selectHistData).activeCoin;
  const COIN = props.coin;

  function handleDeleteCoin() {
    dispatch(deleteCoinAction(COIN, COIN.Id));
  }

  function handleSetActiveCoin() {
    dispatch(setActiveCoin(COIN));
    dispatch(getCoinData(COIN));
    dispatch(getHistData(COIN, tf));
  }

  function renderDeleteButton() {
    if (COIN.Id === deletingCoinId) {
      return <SpinnerIcon className="w-16 remove-icon" />;
    }

    return (
      <span className="remove-icon" onClick={() => handleDeleteCoin()}>
        <TrashIcon />
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
}

export default CoinLi;
