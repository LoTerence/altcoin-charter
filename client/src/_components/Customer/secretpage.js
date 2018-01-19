import React, { Component } from 'react';
import Customers from './customers'

class Secretpage extends Component {

    render() {
        return(
            <div >
                <header >
                    <h1>Altcoin Charter</h1>
                </header>
                <Customers/>
            </div>
        );
    }
}

export default Secretpage;