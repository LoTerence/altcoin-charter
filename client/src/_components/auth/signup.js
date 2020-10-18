import React, { useState } from "react";
import { Link, withRouter, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction, selectAuth } from "../../_store/reducers/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authSelector = useSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  if (authSelector.authenticated) {
    return <Redirect to={"/feature"} />;
  }

  if (authSelector.error !== "") {
    setIsError(true);
    setMessage(authSelector.error);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage("Passwords do not match!");
      setIsError(true);
    } else if (email === "") {
      setMessage("Email field empty");
      setIsError(true);
    } else {
      try {
        dispatch(signUpAction(history, { email, password: password1 }));
      } catch (err) {
        setIsError(true);
      }
    }
  }

  function renderAlert() {
    if (isError) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          {message}
        </div>
      );
    }
  }

  return (
    <div className="col-md-8 col-md-offset-2">
      <h2>Sign up for Altcoin Charter to save a personal watchlist!</h2>
      <form>
        <fieldset className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input
            name="passwordConfirm"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </fieldset>
        {renderAlert()}
        <button
          className="btn btn-primary"
          onClick={(e) => handleFormSubmit(e)}
        >
          Sign Up
        </button>
      </form>
      <h4>
        Already have an account? Click{" "}
        <Link className="nav-link" to="/signin">
          here
        </Link>{" "}
        to sign in!
      </h4>
    </div>
  );
}

export default withRouter(Signup);
