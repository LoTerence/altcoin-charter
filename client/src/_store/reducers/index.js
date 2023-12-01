import authReducer from "./authSlice";
import coinListReducer from "./coinListSlice";
import historyReducer from "./historySlice";
import symbolsSlice from "./symbolsSlice";
import watchListReducer from "./watchListSlice";

const rootReducer = {
  reducer: {
    auth: authReducer,
    coinList: coinListReducer,
    history: historyReducer,
    symbols: symbolsSlice,
    watchList: watchListReducer,
  },
};

export default rootReducer;
