import axios from 'axios';

export const USER_REGISTERED = 'registered_user';
export const REGISTRATION_ERROR = 'registration_user_error';

export function signUpAction({ name, email, password }, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post('/users/register', { name, email, password });

            if(res.data.success){
                dispatch({ type: USER_REGISTERED });
                history.push('/');
            } else {
                dispatch({ 
                    type: REGISTRATION_ERROR,
                    payload: res.data.msg
                 });
            }

        } catch(error) {
            dispatch({
                type: REGISTRATION_ERROR,
                payload: 'something went wrong with user registration in sign up action creator'
            });
        }
    };
}
