import { createBrowserRouter, Outlet } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import ErrorPage from "./pages/ErrorPage";
import Feature from "./pages/Feature";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OAuthCallback from "./_components/auth/OAuthCallback";
import SignOut from "./_components/auth/Signout";
import Header from "./_components/universal/Header";
import Footer from "./_components/universal/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
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
        Component: SignIn,
      },
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
        Component: SignOut,
      },
      {
        path: "feature",
        Component: Feature,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
]);

export default router;
