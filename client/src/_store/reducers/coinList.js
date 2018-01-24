import {GET_COINS} from '../actions/constants';

const coinListReducer = (state={}, action) => {
    switch(action.type) {
        case GET_COINS:
            return { ...state, coins:action.payload };
        default:
            return state;
    }
}

export default coinListReducer;