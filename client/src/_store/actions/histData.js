/* histData.js 
--- actions related to chart's historical data 
This application uses cryptocompare.com's api to fetch a cryptocurrency's data - credit goes to cryptocompare.com
*/

// import axios middleware and consts
import axios from 'axios';
import {
    GET_HIST_DATA,
    HIST_DATA_ERR,
    GET_COIN_DATA
} from './constants';

// GET historical data: dispatches an array of objects with x and y coordinates
export const getHistData = () => {
    return (dispatch) => {
        axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=365')
        .then((res)=> {

            //array that will hold the historical data/payload/xy coordinates
            let histData =[];              
            //loop through the "Data" array from the json res and save its time property as the x coordinate and close property as the y coordinate
            for(let i=0; i<res.data.Data.length; i++){
                let date = new Date(res.data.Data[i].time);
                let coord = {
                    x: date,
                    y: res.data.Data[i].close
                };
                histData.push(coord);
            }

            dispatch({
                type: GET_HIST_DATA,
                payload: histData
            });
        })
        .catch( (err) => {
            console.log('error in getHistData method api call to cryptocompare.com \n'+err);
            dispatch(histDataError('err'));
        });
    };
}

// action creator for when there is an error the other action functions
function histDataError(error) {
    return {
        type: HIST_DATA_ERR,
        payload: error
    };
}

// getCoinData(coin)  => function that takes a coin obj and dispatches that coin's current trading info (price, vol, open, high, low etc) from the last 24 hours
export function getCoinData(coin){
    return (dispatch) => {
        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym='+ coin.Name +'&tsym=USD&e=CCCAGG')
        .then((res)=>{
            let coindata = {
                currentPrice: res.data.DISPLAY.PRICE,
                pctChange: res.data.DISPLAY.CHANGEPCT24HOUR,
                open: res.data.DISPLAY.OPEN24HOUR,
                high: res.data.DISPLAY.HIGH24HOUR,
                low: res.data.DISPLAY.LOW24HOUR,
                usdChange: res.data.DISPLAY.CHANGE24HOUR,
                //marketCap: res.data.DISPLAY.,
                //supply: res.data.DISPLAY.
            };

            dispatch({
                type: GET_COIN_DATA,
                payload: coindata
            });

        })
        .catch((err)=>{
            console.log('error in getCoinData function api request: '+err);
            dispatch(histDataError('err'));
        });
    }
}