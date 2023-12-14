import Layout from "./Layout";
import ContactUs from "../pages/ContactUs";
import ErrorPage from "./ErrorPage";
import Home from "../pages/Home";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import OAuthCallback from "../pages/OAuthCallback";
// TODO: lazy load private routes?
import Feature from "../pages/Feature";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import SignOut from "../pages/SignOut";
import PrivateRoute from "./PrivateRoute";

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
