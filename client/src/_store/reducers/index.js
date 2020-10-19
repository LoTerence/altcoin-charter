// import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
// import authReducer from "./auth_reducer";
import authReducer1 from "./authSlice";
import coinListReducer1 from "./coinListSlice";
import histDataReducer1 from "./histDataSlice";
// import coinListReducer from "./coinList";
// import histDataReducer from "./histData_reducer";
import watchListReducer from "./watchList_reducer";

// export default combineReducers({
//   form: formReducer,
//   auth: authReducer,
//   coinList: coinListReducer,
//   histData: histDataReducer,
//   watchList: watchListReducer
// });

const rootReducer = {
  reducer: {
    // form: formReducer,
    auth: authReducer1,
    coinList: coinListReducer1,
    histData: histDataReducer1,
    watchList: watchListReducer,
  },
};

export default rootReducer;
