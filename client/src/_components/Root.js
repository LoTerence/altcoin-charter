import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./universal/Header";
import Footer from "./universal/Footer";

const Root = () => {
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

export default Root;
