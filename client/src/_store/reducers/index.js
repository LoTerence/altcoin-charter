import authReducer from "./authSlice";
import coinListReducer from "./coinListSlice";
import darkModeReducer from "./darkModeSlice";
import historyReducer from "./historySlice";
import watchListReducer from "./watchListSlice";

const rootReducer = {
  reducer: {
    auth: authReducer,
    coinList: coinListReducer,
    darkMode: darkModeReducer,
    history: historyReducer,
    watchList: watchListReducer,
  },
};

export default rootReducer;
