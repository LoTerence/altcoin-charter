import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './_store'

import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import Navbar from './_components/universal/navbar';
import Homepage from './_components/homepage';
import Signin from './_components/auth/signin';
import Signup from './_components/auth/signup';
import Signout from './_components/auth/signout';
import SecretPage from './_components/Customer/secretpage';
import requireAuth from './_components/auth/require_auth';
import noRequireAuth from './_components/auth/no_required_auth';

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

        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Homepage} />
            <Route path="/signin" component={noRequireAuth(Signin)} />
            <Route path="/signup" component={noRequireAuth(Signup)} />
            <Route path="/signout" component={requireAuth(Signout)} />
            <Route path="/secret" component={requireAuth(SecretPage)} />
          </div>
        </Router>

      </Provider>
    )
  }
}

export default App;
