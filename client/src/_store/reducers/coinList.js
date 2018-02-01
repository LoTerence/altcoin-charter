import {
    GET_COINS,
    ADD_COIN,
    COIN_ERR,
    DEL_COIN
} from '../actions/constants';

const coinListReducer = (state={}, action) => {
    switch(action.type) {
        case GET_COINS:
            return { ...state, coins:action.payload };
        case ADD_COIN:
            return { ...state, coins:action.payload, error:'' };
        case COIN_ERR:
            return { ...state, error:action.payload };
        case DEL_COIN:
            return { ...state, coins:action.payload, error: ''};
        default:
            return state;
    }
}

export default coinListReducer;