import React, { Component } from 'react';
import Customers from './Customer/customers'

class Secretpage extends Component {

    render() {
        return(
            <div >
                <header >
                    <h1>homepage</h1>
                </header>
                <Customers/>
            </div>
        );
    }
}

export default Secretpage;