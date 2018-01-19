import { USER_REGISTERED, REGISTRATION_ERROR } from '../actions/signup';

const signUpReducer = (state={}, action) => {
    switch(action.type) {
        case USER_REGISTERED:
            return { ...state, registered:true };
        case REGISTRATION_ERROR:
            return { ...state, registered:false, msg:action.payload};   //this might cause an error  because idk what ...state means
    }
    return state;
}

export default signUpReducer;