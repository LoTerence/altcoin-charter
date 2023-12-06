import authReducer from "./authSlice";
import coinListReducer from "./coinListSlice";
import darkModeReducer from "./darkModeSlice";
import historyReducer from "./historySlice";
import symbolsSlice from "./symbolsSlice";
import watchListReducer from "./watchListSlice";

const rootReducer = {
  reducer: {
    auth: authReducer,
    coinList: coinListReducer,
    darkMode: darkModeReducer,
    history: historyReducer,
    symbols: symbolsSlice,
    watchList: watchListReducer,
  },
};

export default rootReducer;
