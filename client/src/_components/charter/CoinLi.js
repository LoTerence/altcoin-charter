// a <li> element modified to display coins: coinLi
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoinAction } from "../../_store/reducers/coinListSlice";
import {
  getCoinData,
  getHistData,
  setActiveCoin,
  selectHistData,
} from "../../_store/reducers/histDataSlice";

// optional-TODO add onclick action for changing color
// optional-TODO add onhover action

const coinLiStyle = {
  border: "1px solid #BCED91",
  borderLeft: "10px solid #BCED91",
  borderRadius: "0px",
  background: "#fafafa",
  margin: "5px",
  padding: "5px 10px",
};

function CoinLi(props) {
  const dispatch = useDispatch();
  const tf = useSelector(selectHistData).activeTimeframe;
  const COIN = props.coin;

  function handleDeleteCoin() {
    dispatch(deleteCoinAction(COIN));
  }

  function handleSetActiveCoin() {
    dispatch(setActiveCoin(COIN));
    dispatch(getCoinData(COIN));
    dispatch(getHistData(COIN, tf));
  }

  return (
    <div className="col-md-4 col-sm-6">
      <div style={coinLiStyle}>
        <span
          className="glyphicon glyphicon-remove pull-right"
          onClick={() => handleDeleteCoin()}
        ></span>
        <div onClick={() => handleSetActiveCoin()}>
          <h4>{COIN.Name}</h4>
          <p>{COIN.CoinName} price history, day's change</p>
        </div>
      </div>
    </div>
  );
}

export default CoinLi;
