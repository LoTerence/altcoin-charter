/* 
coinInfo.js 
component that will display the active coin's day's data including current price, 
    day's %change, day's open, high, low, incremental change, market cap, and supply
*/

// TODO: add twitter button?
import { useSelector } from "react-redux";
import { selectHistData } from "../../_store/reducers/histDataSlice";
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
  const { activeCoin, coinData, fetchHistInProgress, fetchCoinInProgress } =
    useSelector(selectHistData);
  const isLoading = fetchHistInProgress || fetchCoinInProgress;

  if (!activeCoin || !coinData || !activeCoin.Name) {
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
        <h1>{coinData.currentPrice}</h1>
        <p>{coinData.pctChange}% change today</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today's Open: {coinData.open}</p>
        <p>Change: {coinData.usdChange}</p>
      </div>
      <div className="p-2 flex-fill">
        <p>Today's High: {coinData.high}</p>
        <p>Today's Low: {coinData.low}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
