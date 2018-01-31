import React, { Component } from 'react';
import Charter from './charter/charter';
import Header from './universal/header';
import Footer from './universal/footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from "./feature";
import RequireAuth from './auth/require_auth';

class HomePage extends Component {

    render() {
        return(
            <div >
                <Header />

                <Switch>
                    <Route exact path="/" component = {Charter} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/feature" component={RequireAuth(Feature)} />
                </Switch>

                <Footer />
            </div>
        );
    }
}

export default HomePage;