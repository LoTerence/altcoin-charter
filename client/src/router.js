import { createBrowserRouter } from "react-router-dom";
import Root from "./_components/Root";
import Charter from "./_components/charter";
import OAuthCallback from "./_components/auth/OAuthCallback";
import Signin from "./_components/auth/Signin";
import Signout from "./_components/auth/Signout";
import Signup from "./_components/auth/Signup";
import ContactUs from "./_components/pages/ContactUs";
import ErrorPage from "./_components/pages/ErrorPage";
import Feature from "./_components/pages/Feature";
import PrivacyPolicy from "./_components/pages/PrivacyPolicy";
import Settings from "./_components/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        Component: Charter,
      },
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
    ],
  },
]);

export default router;
