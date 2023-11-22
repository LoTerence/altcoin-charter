import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./_components/Root";
import { useDispatch } from "react-redux";
import { authenticate } from "./_store/reducers/authSlice";
import "./App.scss";

import Feature from "./_components/Feature";

import OAuthCallback from "./_components/auth/OAuthCallback";
import Signin from "./_components/auth/Signin";
import Signout from "./_components/auth/Signout";
import Signup from "./_components/auth/Signup";
import ContactUs from "./_components/pages/ContactUs";
import ErrorPage from "./_components/pages/ErrorPage";
import PrivacyPolicy from "./_components/pages/PrivacyPolicy";
import Settings from "./_components/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/signin",
    Component: Signin,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/privacy-policy",
    Component: PrivacyPolicy,
  },
  {
    path: "/contact-us",
    Component: ContactUs,
  },
  {
    path: "/oauthcallback",
    Component: OAuthCallback,
  },
  {
    path: "/signout",
    Component: Signout,
  },
  {
    path: "/feature",
    Component: Feature,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "*",
    Component: Root,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const dispatch = useDispatch();

  // extract user from token then authenticate
  const token = localStorage.getItem("token");

  // TODO: should check if token is legit
  // server will check jwt token to see if it is legit before returning any user data
  if (token) {
    dispatch(authenticate());
  }

  return <RouterProvider router={router} history="" />;
}

export default App;
