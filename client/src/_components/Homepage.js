import React from "react";
import Charter from "./charter/Charter";
import Header from "./universal/Header";
import Footer from "./universal/Footer";

import { Route, Switch } from "react-router-dom";

import Signin from "./auth/Signin";
import Signout from "./auth/Signout";
import Signup from "./auth/Signup";
import GoogleCallback from "./auth/GoogleCallback";
import Feature from "./Feature";
import PrivateRoute from "./auth/PrivateRoute";

function HomePage() {
  return (
    <>
      <Header />

      <div className="container">
        <Switch>
          <Route exact path="/" component={Charter} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/googlecallback" component={GoogleCallback} />
          <PrivateRoute path="/signout" component={Signout} />
          <PrivateRoute path="/feature" component={Feature} />
        </Switch>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
