import {combineReducers} from 'redux';
import customerReducer from './customer';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import coinListReducer from './coinList';

export default combineReducers({
  customers: customerReducer,
  form: formReducer,
  auth: authReducer,
  coinList: coinListReducer
});
