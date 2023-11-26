import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector(selectAuth);

  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
