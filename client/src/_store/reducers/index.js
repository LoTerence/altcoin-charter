import {combineReducers} from 'redux';
import customerReducer from './customer';
import { reducer as formReducer } from 'redux-form';
import signInReducer from './signin';

export default combineReducers({
  customers: customerReducer,
  form: formReducer,
  signin: signInReducer
});
