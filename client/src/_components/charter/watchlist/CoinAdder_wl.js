/* coinAdder_wl.js
 * component that adds a new coin to watchlist
 *
 * known issue: updating watchlist on the front end is noticeably slow
 *
 * TODO: add loading indicator
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoinWLAction,
  selectWatchList,
} from "../../../_store/reducers/watchListSlice";

const CoinAdder_wl = () => {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const errorMessage = useSelector(selectWatchList).error;

  function handleBtnClick(e) {
    e.preventDefault();
    dispatch(addCoinWLAction(symbol));
    setSymbol("");
  }

  const renderAlert = () => {
    if (errorMessage) {
      return <div className="alert alert-danger">{errorMessage}</div>;
    }
  };

  return (
    <div className="col-md-4 col-sm-6">
      <label>Add a new coin to the list</label>
      <form>
        <fieldset className="input-group">
          <input
            name="symbol"
            type="string"
            className="form-control"
            placeholder="Altcoin Symbol, i.e. BTC, LTC..."
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <span>
            <button
              className="btn btn-success"
              action="submit"
              onClick={(e) => handleBtnClick(e)}
            >
              Add
            </button>
          </span>
        </fieldset>
      </form>
      {renderAlert()}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     errorMessage: state.watchList.error,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addCoin: (coin_symbol) => dispatch(addCoin(coin_symbol)),
//   };
// };

// const reduxFormCoinAdderwl = reduxForm({
//   form: "CoinAdder_wl",
// })(CoinAdder_wl);

export default CoinAdder_wl;
