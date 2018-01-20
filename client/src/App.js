import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './_store'
//import { BrowserRouter as Router, Route } from 'react-router-dom'; //replaced with next line, but next line could be outdated? Need to read documentation
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import Homepage from './_components/homepage';
import Signin from './_components/auth/signin';
import Signout from './_components/auth/signout';
import Signup from './_components/auth/signup';
import Feature from "./_components/feature"; //TODO create feature component
import RequireAuth from './_components/auth/require_auth';

//   -----  code that checks local storage for a 'user' token. In the case that there is, dispatch an action of type authenticated into reducers
import { AUTH_USER } from './_store/actions/constants';
const token = localStorage.getItem('token');
if(token) {
  store.dispatch({ type: AUTH_USER });
} //  ----- end 

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <Router history={browserHistory}>
            <Route exact path="/" component={Homepage}>
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/signout" component={Signout} />
              <Route path="/feature" component={RequireAuth(Feature)} />
            </Route>
        </Router>
      </Provider>
    )
  }
}

export default App;
