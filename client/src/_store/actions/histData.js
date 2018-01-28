/* histData.js 
--- actions related to chart's historical data 
This application uses cryptocompare.com's api to fetch a cryptocurrency's historical data - credit goes to cryptocompare.com
*/

// import axios middleware and consts
import axios from 'axios';
import {
    GET_HIST_DATA,
    HIST_DATA_ERR
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
                let coord = {
                    x: res.data.Data[i].time,
                    y: res.data.Data[i].close
                }
                histData.push(coord);
            }

            dispatch({
                type: GET_HIST_DATA,
                payload: histData
            })
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