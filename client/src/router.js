import { createBrowserRouter, Outlet } from "react-router-dom";
import Charter from "./_components/charter";
import OAuthCallback from "./_components/auth/OAuthCallback";
import Signin from "./_components/auth/Signin";
import Signout from "./_components/auth/Signout";
import Signup from "./_components/auth/Signup";
import ContactUs from "./pages/ContactUs";
import ErrorPage from "./pages/ErrorPage";
import Feature from "./pages/Feature";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Settings from "./pages/Settings";
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
        Component: Charter,
      },
      {
        path: "signin",
        Component: Signin,
      },
      {
        path: "signup",
        Component: Signup,
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
        Component: Signout,
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
