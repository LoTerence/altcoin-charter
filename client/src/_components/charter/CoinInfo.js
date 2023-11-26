/* 
coinInfo.js 
component that will display the active coin's day's data including current price, 
    day's %change, day's open, high, low, incremental change, market cap, and supply
*/

// TODO: add twitter button?
import { useSelector } from "react-redux";
import { selectHistory } from "../../_store/reducers/historySlice";
import { useActiveCoin } from "../hooks";
import { SpinnerIcon } from "../icons";

const LoadingOverlay = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="coin-info-loading">
          <SpinnerIcon className="w-32 h-32" />
        </div>
      )}
    </>
  );
};

const CoinInfo = () => {
  const activeCoin = useActiveCoin();
  const { coinInfo, status } = useSelector(selectHistory);
  const isLoading = status === "loading";

  if (!activeCoin || !coinInfo || !activeCoin.CoinName) {
    return (
      <div className="alert alert-warning">
        <LoadingOverlay isLoading={isLoading} />
        Select a coin from the list below to see its data
      </div>
    );
  }

  return (
    <div className="coin-info d-flex flex-column flex-md-row justify-content-evenly align-items-start align-items-md-center flex-wrap">
      <LoadingOverlay isLoading={isLoading} />
      <div className="p-2 flex-fill">
        <p>{activeCoin.CoinName}'s current Price:</p>
        <h1>{coinInfo.currentPrice}</h1>
        <p>{coinInfo.pctChange}% change today</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today's Open: {coinInfo.open}</p>
        <p>Change: {coinInfo.usdChange}</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today's High: {coinInfo.high}</p>
        <p>Today's Low: {coinInfo.low}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
