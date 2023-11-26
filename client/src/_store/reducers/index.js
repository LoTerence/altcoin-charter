import authReducer from "./authSlice";
import coinListReducer from "./coinListSlice";
import histDataReducer from "./histDataSlice";
import watchListReducer from "./watchListSlice";

const rootReducer = {
  reducer: {
    auth: authReducer,
    coinList: coinListReducer,
    histData: histDataReducer,
    watchList: watchListReducer,
  },
};

export default rootReducer;
