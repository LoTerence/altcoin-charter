import authReducer from "./authSlice";
import coinListReducer from "./coinListSlice";
import historyReducer from "./historySlice";
import watchListReducer from "./watchListSlice";

const rootReducer = {
  reducer: {
    auth: authReducer,
    coinList: coinListReducer,
    history: historyReducer,
    watchList: watchListReducer,
  },
};

export default rootReducer;
