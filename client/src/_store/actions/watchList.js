import axios from 'axios';
import {
    GET_COINS_WL,
    ADD_COIN_WL,
    COIN_ERR_WL,
    DEL_COIN_WL
} from './constants';

/* TODO modify mongodb so that user has a property with a personal 
watchlist in it. Add express pathing for getting, adding, and deleting a coin
*/
// GET COINS
export const getCoins = () => {
    return function(dispatch){
        axios.get('/users/watchlist',{
            headers: { authorization: localStorage.getItem('token') }
        })
        .then((res) => {
            dispatch({
                type: GET_COINS_WL,
                payload: res.data
            });
        });
    };
}

// ADD COIN to watchlist
export const addCoin = (newCoinSymbol) => {
    const sym = (newCoinSymbol.symbol).toUpperCase();
    return async(dispatch) => {
        axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
            .then( (res)=>{
                if(res.data.Data[sym]){                      //if the symbol represents an altcoin from cryptocompare.com, add the coin to the coinlist db

                    axios.put(                                 //adding coin to users/watchlist mongodb
                        '/users/watchlist/addcoin',
                        {
                            newCoin:{
                                Id: res.data.Data[sym].Id,
                                Name: res.data.Data[sym].Name,
                                Symbol: res.data.Data[sym].Symbol,
                                CoinName: res.data.Data[sym].CoinName
                            }
                        }, 
                        { headers: {  authorization: localStorage.getItem('token') } }
                     ).then((res2)=>{
                        if(res2.data.success){
                            dispatch({
                                type:ADD_COIN_WL,
                                payload: res2.data.newWatchList
                            });
                        } else {
                            dispatch(coinError(res2.data.msg));
                        }

                     }).catch((err)=>{
                        console.log('error in putting to watchlist in addcoin method');
                        dispatch(coinError('error in putting to watchlist in addcoin method'));
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

// Error action creator
function coinError(error) {
    return {
        type: COIN_ERR_WL,
        payload: error
    };
}

// DELETE COIN from watchlist
export const deleteCoin = (coin) => {
    const sym = coin.Symbol;
    return function(dispatch) {
        axios.put(
            '/users/watchlist/delcoin',
            { Symbol: sym },
            { headers: {  authorization: localStorage.getItem('token') } }
        ).then((res2) => {
            if(res2.data.success){
                dispatch({
                    type:DEL_COIN_WL,
                    payload: res2.data.newWatchList
                });
            } else {
                dispatch(coinError(res2.data.msg));
            }
        }).catch((err) => {
            console.log(err);
            dispatch(coinError('There was an error putting from watchlist/delcoin'));
        });
    };
}