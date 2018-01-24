import {GET_COINS} from './constants';

/* 
credits- API data is from cryptocompare.com
 https://min-api.cryptocompare.com/
*/

// action creator that sends a list of coins to reducer/state
// the list of coins should be saved somewhere
export const getCoins = () => {
    let coins = [
        {
            Id:	"1182",
            Url:	"/coins/btc/overview",
            ImageUrl:	"/media/19633/btc.png",
            Name:	"BTC",
            Symbol:	"BTC",
            CoinName:	"Bitcoin"
        }, {
            Id:	"3808",
            Url:	"/coins/ltc/overview",
            ImageUrl:	"/media/19782/litecoin-logo.png",
            Name:	"LTC",
            Symbol:	"LTC",
            CoinName:	"Litecoin"
        }
    ];

    return { type: GET_COINS, payload:coins };
}
  