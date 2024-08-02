/*
 * CoinInfo -
 * displays the active coin's day's data including current price,
 * day's percent change, day's open, high, low, incremental change,
 * market cap, and supply
 */
import { useSelector } from "react-redux";
import { selectHistory } from "../../_store/reducers/historySlice";
import { useActiveCoin } from "../hooks";
import Loading from "../universal/Loading";

const CoinInfo = () => {
  const activeCoin = useActiveCoin();
  const { coinInfo, error, status } = useSelector(selectHistory);
  const isLoading = status === "loading";

  if (error) {
    return (
      <div className="alert alert-danger">
        <Loading isLoading={isLoading} />
        {error}
      </div>
    );
  }

  if (!activeCoin || !coinInfo || !activeCoin.coinName) {
    return (
      <div className="alert alert-warning">
        <Loading isLoading={isLoading} />
        Select a coin from the list below to see its data
      </div>
    );
  }

  return (
    <div className="coin-info d-flex flex-column flex-md-row justify-content-evenly align-items-start align-items-md-center flex-wrap">
      <Loading isLoading={isLoading} />
      <div className="p-2 flex-fill">
        <p>{activeCoin.coinName}&apos;s current Price:</p>
        <h1>{coinInfo.currentPrice}</h1>
        <p>{coinInfo.pctChange}% change today</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today&apos;s Open: {coinInfo.open}</p>
        <p>Change: {coinInfo.usdChange}</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today&apos;s High: {coinInfo.high}</p>
        <p>Today&apos;s Low: {coinInfo.low}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
