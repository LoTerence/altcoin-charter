import React from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./_store/reducers/authSlice";
import router from "./router";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  // extract user from token then authenticate
  const token = localStorage.getItem("token");

  // TODO: should check if token is legit
  // server will check jwt token to see if it is legit before returning any user data
  if (token) {
    dispatch(authenticate());
  }

  return <RouterProvider router={router} history="" />;
}

export default App;
