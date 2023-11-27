import authReducer from "./authSlice";
import coinListReducer from "./coinListSlice";
import historyuReducer from "./historySlice";
import watchListReducer from "./watchListSlice";

const rootReducer = {
  reducer: {
    auth: authReducer,
    coinList: coinListReducer,
    history: historyuReducer,
    watchList: watchListReducer,
  },
};

export default rootReducer;
