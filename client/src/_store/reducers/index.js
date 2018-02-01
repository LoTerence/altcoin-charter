import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import coinListReducer from './coinList';
import histDataReducer from './histData_reducer';
import watchListReducer from './watchList_reducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  coinList: coinListReducer,
  histData: histDataReducer,
  watchList: watchListReducer
});
