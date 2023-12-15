import { lazy } from "react";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
const ContactUs = lazy(() => import("../pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const OAuthCallback = lazy(() => import("../pages/OAuthCallback"));
const Feature = lazy(() => import("../pages/Feature"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const SignOut = lazy(() => import("../pages/SignOut"));

const routes = [
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        Component: Home,
      },
      { path: "signin", Component: SignIn },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "oauthcallback",
        Component: OAuthCallback,
      },
      {
        path: "signout",
        element: (
          <PrivateRoute>
            <SignOut />
          </PrivateRoute>
        ),
      },
      {
        path: "feature",
        element: (
          <PrivateRoute>
            <Feature />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default routes;
