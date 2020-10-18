// Component for the unordered list of coins: CoinUList

import React, { useEffect } from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import { getCoins } from "../../_store/actions/coinList";
import CoinLi from "./coinLi";
import CoinAdder from "./coinAdder";

function CoinUList(props) {
  // static propTypes = {
  //   getCoins: PropTypes.func.isRequired,
  //   coins: PropTypes.array.isRequired           //an array of coin objects
  // }

  // static defaultProps = {
  //   coins: []
  // }

  useEffect(() => {
    props.getCoins();
  }, []);

  return (
    <div>
      {props.coins.map((coin) => (
        <CoinLi key={coin.Id} coin={coin} />
      ))}

      <CoinAdder />
    </div>
  );
}

const mapStateToProps = (state) => ({
  coins: state.coinList.coins,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCoins: () => dispatch(getCoins()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinUList);
