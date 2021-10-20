import React from "react";
import Charter from "./charter/Charter";
import Header from "./universal/Header";
import Footer from "./universal/Footer";

import { Route, Switch } from "react-router-dom";

import Signin from "./auth/Signin";
import Signout from "./auth/Signout";
import Signup from "./auth/Signup";
import OAuthCallback from "./auth/OAuthCallback";
import Feature from "./Feature";
import PrivateRoute from "./auth/PrivateRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import Settings from "./pages/Settings";

function HomePage() {
  return (
    <>
      <Header />

      <div className="container">
        <Switch>
          <Route exact path="/" component={Charter} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/oauthcallback" component={OAuthCallback} />
          <PrivateRoute path="/signout" component={Signout} />
          <PrivateRoute path="/feature" component={Feature} />
          <PrivateRoute path="/settings" component={Settings} />
        </Switch>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
