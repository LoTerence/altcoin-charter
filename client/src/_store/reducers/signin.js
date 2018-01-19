import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../actions/signin';

const signInReducer = (state={}, action) => {
    switch(action.type) {
        case AUTHENTICATED:
            return { ...state, authenticated:true };
        case UNAUTHENTICATED:
            return { ...state, authenticated:false, msg:action.payload};   //this might cause an error  because idk what ...state means
        case AUTHENTICATION_ERROR:
            return { ...state, authenticated:false, msg:action.payload };
    }
    return state;
}

export default signInReducer;

/*
TODO:
revise this file so that unauthenticated doest return action payload because it doesnt always have an action.. figure it out
*/