import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../_store/reducers/authSlice";
import { useWithRouter } from "./useWithRouter";
import PrivateRoute from "./PrivateRoute";
import Layout from "../universal/Layout";

function Signout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutAction());
  }, [dispatch]); // TODO: do I need to include this [dispatch] ?

  return (
    <PrivateRoute>
      <Layout>
        <h1>You have been logged out</h1>
      </Layout>
    </PrivateRoute>
  );
}

export default useWithRouter(Signout);
