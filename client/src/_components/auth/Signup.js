import React, { useState } from "react";
import { Link, withRouter, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction, selectAuth } from "../../_store/reducers/authSlice";
import * as EmailValidator from "email-validator";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

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

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (email === "") {
      setMessage("Email field should not be empty");
      setIsError(true);
      return;
    }

    if (!EmailValidator.validate(email)) {
      setMessage("Invalid email");
      setIsError(true);
      return;
    }

    if (password1 === "") {
      setMessage("Password field empty");
      setIsError(true);
      return;
    }

    if (password1.length < 6) {
      setMessage("Password length should be at least 6 characters");
      setIsError(true);
      return;
    }

    if (password1 !== password2) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    }

    try {
      dispatch(signUpAction(history, { email, password: password1 }));
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  function renderAlert() {
    if (authSelector.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {authSelector.error}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong>
          {message}
        </div>
      );
    }
  }

  return (
    <div className="container py-5 h-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <form className="text-center">
            <h3 className="mb-5">
              Sign up for Altcoin Charter to save a personal watchlist!
            </h3>

            {/* Email Input */}
            <div className="form-floating mb-4">
              <input
                name="email"
                id="signupEmail"
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label style={{ opacity: "0.5" }} htmlFor="signupEmail">
                Email
              </label>
            </div>

            {/* Password inputs */}
            <div className="form-floating mb-4">
              <input
                name="password"
                id="signupPassword1"
                type="password"
                className="form-control form-control-lg"
                placeholder="password1"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <label style={{ opacity: "0.5" }} htmlFor="signupPassword1">
                Password:
              </label>
            </div>
            <div className="form-floating mb-4">
              <input
                name="passwordConfirm"
                id="signupPassword2"
                type="password"
                className="form-control form-control-lg"
                placeholder="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <label style={{ opacity: "0.5" }} htmlFor="signupPassword2">
                Confirm Password:
              </label>
            </div>
            {renderAlert()}
            <button
              className="btn btn-success btn-lg btn-block container-fluid"
              onClick={(e) => handleFormSubmit(e)}
            >
              Sign Up
            </button>
            <hr className="my-4" />
          </form>
          {/* <button className="btn google-button btn-lg mb-2" type="submit">
            <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
          </button>
          <button className="btn fb-button btn-lg mb-2" type="submit">
            <FontAwesomeIcon icon={faFacebook} /> Sign in with Facebook
          </button> */}
          <br />
          <p>
            Already have an account? Click <Link to="/signin">here</Link> to
            sign in!
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signup);
