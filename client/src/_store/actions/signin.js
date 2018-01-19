import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function signInAction({ email, password }, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post('/users/authenticate', { email, password });

            if(res.data.success){
                dispatch({ type: AUTHENTICATED });
                localStorage.setItem('user', res.data.token);
                history.push('/secret');
            } else {
                dispatch({ 
                    type: UNAUTHENTICATED,
                    payload: res.data.msg
                 });
            }

        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'something went wrong with user authentication in sign in action creator'
            });
        }
    };
}

export function signOutAction() {
    localStorage.clear();
    return {
        type:UNAUTHENTICATED
    };
}