import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

function PrivateRoute({ children }) {
  const authenticated = useSelector(selectAuth).authenticated;

  return authenticated ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
