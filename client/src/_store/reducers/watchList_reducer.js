import {
    GET_COINS_WL,
    ADD_COIN_WL,
    COIN_ERR_WL,
    DEL_COIN_WL
} from '../actions/constants';

const watchListReducer = (state={}, action) => {
    switch(action.type) {
        case GET_COINS_WL:
            return { ...state, coins:action.payload };
        case ADD_COIN_WL:
            return { ...state, coins:action.payload, error:'' };
        case COIN_ERR_WL:
            return { ...state, error: action.payload };
        case DEL_COIN_WL:
            return { ...state, coins:action.payload };
        default:
            return state;
    }
}

export default watchListReducer;