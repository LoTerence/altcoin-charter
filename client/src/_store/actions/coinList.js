import axios from 'axios';
import { 
    GET_COINS,
    ADD_COIN,
    COIN_ERR,
    DEL_COIN,
    SET_ACTIVE_COIN
 } from './constants';

/* 
credits- API data is from cryptocompare.com
 https://min-api.cryptocompare.com/
*/

// GET COINS -- action creator that sends a list of coins from db to reducer/state
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
  
// ADD COIN method
//TODO(if you want) add by coinname as well as symbol
export const addCoin = (newCoinSymbol) => {
    const sym = (newCoinSymbol.symbol).toUpperCase();         //convert newCoinSymbol param to uppercase string 

    return async(dispatch) => {
        axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
            .then( (res)=>{
                if(res.data.Data[sym]){                      //if the symbol represents an altcoin from cryptocompare.com, add the coin to the coinlist db

                    axios.post(                                 //adding coin to coinlist db
                        '/coins_unauth/addCoin',
                        {
                            Id: res.data.Data[sym].Id,
                            Name: res.data.Data[sym].Name,
                            Symbol: res.data.Data[sym].Symbol,
                            CoinName: res.data.Data[sym].CoinName,
                        }
                     ).then((res2)=>{
                        console.log("adding coin: " + sym);
                        
                        axios.get('/coins_unauth/coinList')                 //dispatch the new coinlist 
                            .then((res3)=> {
                                dispatch({
                                    type: ADD_COIN,
                                    payload: res3.data
                                })
                            }) 

                     }).catch((err)=>{
                        console.log('error in posting to coins_unauth in addcoin method: ')
                     });

                }else{        //if symbol doesnt exist, dispatch an error message
                    dispatch(coinError('A coin with that symbol does not exist'));
                }
            })
            .catch( (err) => {
                console.log('error in addCoin method api call to cryptocompare.com ');
                dispatch(coinError('err'));
            });
    }
}

// action creator for when there is an error the other action functions
function coinError(error) {
    return {
        type: COIN_ERR,
        payload: error
    };
}

// DELETE COIN 
export function deleteCoin(coin){
    const sym = coin.Symbol;
    console.log("deleting coin: " +sym);
    return async(dispatch) => {
        axios.delete('/coins_unauth/coinList/'+sym)
            .then((res)=>{

                axios.get('/coins_unauth/coinList')                 //dispatch the new coinlist 
                    .then((res2)=> {
                        console.log(sym+" coin deleted")
                        dispatch({
                            type: DEL_COIN,
                            payload: res2.data
                        })
                    }) 

            })
            .catch((err)=>{
                console.log(err)
                coinError('There was an error in deleting from coins_unauth in deletecoin action');
            });
    }
}

// SET ACTIVE COIN - action that sets the coin parameter to the applications active coin-the coin that the app will display info about
export function setActiveCoin(coin){
    return {
        type: SET_ACTIVE_COIN,
        payload: coin
    };
}