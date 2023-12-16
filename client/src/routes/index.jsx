import { lazy, Suspense } from "react";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import Loading from "../_components/universal/Loading";
import Home from "../pages/Home";
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
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
      {
        path: "signin",
        element: (
          <Suspense fallback={<Loading />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loading />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "contact-us",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "oauthcallback",
        element: (
          <Suspense fallback={<Loading />}>
            <OAuthCallback />
          </Suspense>
        ),
      },
      {
        path: "signout",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <SignOut />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "feature",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <Feature />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <Settings />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default routes;
