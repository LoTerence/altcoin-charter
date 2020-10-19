import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./_components/Homepage";
import { useDispatch } from "react-redux";
import { authenticate } from "./_store/reducers/authSlice";

// extract user from token then authenticate
function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  if (token) {
    dispatch(authenticate());
  }

  return (
    <Router history="">
      <Homepage />
    </Router>
  );
}

export default App;
