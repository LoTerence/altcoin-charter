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
    <div className="col-md-4 col-sm-6 col-12 p-2">
      <label>Add new coin:</label>
      <form>
        <div className="form-floating d-flex">
          <input
            name="symbol"
            id="addNewCoinInput2"
            type="string"
            className="form-control form-control-sm"
            placeholder="Altcoin Symbol, i.e. BTC, LTC..."
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <label style={{ opacity: "0.5" }} htmlFor="addNewCoinInput2">
            Altcoin Symbol, i.e. BTC, LTC...
          </label>
          <button
            className="btn btn-success"
            action="submit"
            onClick={(e) => handleBtnClick(e)}
          >
            Add
          </button>
        </div>
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
