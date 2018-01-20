import React, { Component } from 'react';
import Customers from './Customer/customers';
import Header from './universal/header';

class HomePage extends Component {

    render() {
        return(
            <div >
                <Header />
                <Customers/>
            </div>
        );
    }
}

export default HomePage;