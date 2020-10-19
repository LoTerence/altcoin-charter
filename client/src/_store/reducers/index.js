import authReducer from "./authSlice";
import coinListReducer from "./coinListSlice";
import histDataReducer from "./histDataSlice";
import watchListReducer from "./watchListSlice";

// export default combineReducers({
//   form: formReducer,
//   auth: authReducer,
//   coinList: coinListReducer,
//   histData: histDataReducer,
//   watchList: watchListReducer
// });

const rootReducer = {
  reducer: {
    auth: authReducer,
    coinList: coinListReducer,
    histData: histDataReducer,
    watchList: watchListReducer,
  },
};

export default rootReducer;
