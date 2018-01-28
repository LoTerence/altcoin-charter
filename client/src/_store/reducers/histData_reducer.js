import {
    GET_HIST_DATA,
    HIST_DATA_ERR
} from '../actions/constants';

const histDataReducer = (state = [], action) => {
    switch (action.type) {
      case GET_HIST_DATA:
        return {...state, data:action.payload};
      case HIST_DATA_ERR:
        return {...state, error:action.payload};
      default:
        return state
    }
}

export default histDataReducer;