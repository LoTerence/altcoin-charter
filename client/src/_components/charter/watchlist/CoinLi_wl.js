// a <li> element modified to display coins: coinLi
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoinWLAction } from "../../../_store/reducers/watchListSlice";
// import { getCoinData, getHistData, setActiveCoin } from '../../../_store/actions/histData';
import {
  getCoinData,
  getHistData,
  setActiveCoin,
  selectHistData,
} from "../../../_store/reducers/histDataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CoinLi = (props) => {
  const dispatch = useDispatch();
  const tf = useSelector(selectHistData).activeTimeframe;
  const COIN = props.coin;

  const removeIcon = (
    <FontAwesomeIcon icon={faTrashAlt} className="remove-icon" />
  );

  function handleDeleteCoin() {
    dispatch(deleteCoinWLAction(COIN));
  }

  function handleSetActiveCoin() {
    dispatch(setActiveCoin(COIN));
    dispatch(getCoinData(COIN));
    dispatch(getHistData(COIN, tf));
  }

  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div className="coin-li">
        <span onClick={() => handleDeleteCoin()}>{removeIcon}</span>
        <div onClick={() => handleSetActiveCoin()}>
          <h5>{COIN.Name}</h5>
          <p>{COIN.CoinName} price history, day's change</p>
        </div>
      </div>
    </div>
  );
};

export default CoinLi;
