import React from "react";
import Charter from "./charter/Charter";
import Header from "./universal/Header";
import Footer from "./universal/Footer";

import { Route, Routes } from "react-router-dom";

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
        <Routes>
          <Route path="/" element={<Charter />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/oauthcallback" element={<OAuthCallback />} />
          <Route
            path="/signout"
            element={
              <PrivateRoute>
                <Signout />
              </PrivateRoute>
            }
          />
          <Route
            path="/feature"
            element={
              <PrivateRoute>
                <Feature />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
