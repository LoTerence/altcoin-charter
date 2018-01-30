import {
    GET_HIST_DATA,
    HIST_DATA_ERR,
    GET_COIN_DATA,
    SET_TIMEFRAME
} from '../actions/constants';

const histDataReducer = (state = {activeTimeframe:"1day"}, action) => {
    switch (action.type) {
      case GET_HIST_DATA:
        return {...state, histData:action.payload};
      case HIST_DATA_ERR:
        return {...state, error:action.payload};
      case GET_COIN_DATA:
        return {...state, coinData:action.payload};
      case SET_TIMEFRAME:
        return {...state, activeTimeframe:action.payload};
      default:
        return state
    }
}

export default histDataReducer;