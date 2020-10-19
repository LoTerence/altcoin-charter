import React from "react";
import Charter from "./charter/Charter";
import Header from "./universal/Header";
import Footer from "./universal/footer";

import { Route, Switch } from "react-router-dom";

import Signin from "./auth/Signin";
import Signout from "./auth/Signout";
import Signup from "./auth/Signup";
import Feature from "./feature";
import PrivateRoute from "./auth/PrivateRoute";

function HomePage() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/" component={Charter} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute path="/signout" component={Signout} />
        <PrivateRoute path="/feature" component={Feature} />
      </Switch>

      <Footer />
    </>
  );
}

export default HomePage;
