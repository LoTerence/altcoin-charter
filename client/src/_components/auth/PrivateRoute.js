import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

function PrivateRoute({ component: Component, ...rest }) {
  const authenticated = useSelector(selectAuth).authenticated;

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        )
      }
    />
  );
}

export default PrivateRoute;
