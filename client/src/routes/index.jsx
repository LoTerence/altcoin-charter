import { lazy, Suspense } from "react";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import Loading from "../_components/universal/LoadingOverlay";
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
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "contact-us",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "oauthcallback",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <OAuthCallback />
          </Suspense>
        ),
      },
      {
        path: "signout",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading isLoading={true} />}>
              <SignOut />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "feature",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading isLoading={true} />}>
              <Feature />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading isLoading={true} />}>
              <Profile />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading isLoading={true} />}>
              <Settings />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default routes;
