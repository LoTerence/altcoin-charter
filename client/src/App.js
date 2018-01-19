import React, { Component } from 'react'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import store from './_store'
import Customers from './_components/Customer/customers'

import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import Navbar from './_components/universal/navbar';
import Homepage from './_components/homepage';
import Signin from './_components/auth/signin';
import Signup from './_components/auth/signup';

//   -----  code that checks local storage for a 'user' token. In the case that there is, dipatch an action of type authenticated into reducers
import { AUTHENTICATED } from './_store/actions/signin';
const user = localStorage.getItem('user');
if(user) {
  store.dispatch({ type: AUTHENTICATED });
} //  ----- end 

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
      
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo"/>
            <h1 className="App-title">Altcoin Charter</h1>
          </header>
          <Customers/>
        </div>

        <Router>
          <div>
            <Navbar />
            <Route path="/signin" component={noRequireAuth(Signin)} />
            <Route path="/signup" component={noRequireAuth(Signup)} />
            <Route path="/signout" component={Signout} />
            <Route path="/secret" component={requireAuth(SecretPage)} />
          </div>
        </Router>

      </Provider>
    )
  }
}

export default App;
