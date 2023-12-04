import { Outlet } from "react-router-dom";
import Header from "../_components/universal/Header";
import Footer from "../_components/universal/Footer";

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

export default Layout;

// TODO: implement Suspense and CustomLoader later:
// import { Suspense } from "react";
// import CustomLoader from "../_components/universal/loader";
/* <Suspense fallback={<CustomLoader />}>
  <Outlet />
</Suspense>; */
