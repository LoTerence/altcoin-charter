import axios from 'axios';
import { GET_COINS } from './constants';

/* 
credits- API data is from cryptocompare.com
 https://min-api.cryptocompare.com/
*/

// action creator that sends a list of coins to reducer/state
// the list of coins should be saved somewhere
export const getCoins = () => {
    return (dispatch) => {
        axios.get('/coins_unauth/coinList')
        .then((response)=> {
            dispatch({
                type: GET_COINS,
                payload: response.data
            })
        })
    };
}
  