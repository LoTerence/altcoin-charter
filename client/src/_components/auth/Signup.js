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

            <button className="btn google-button btn-lg mb-2" type="submit">
              <i className="fab fa-google me-2"></i> Sign in with Google
            </button>
            <button className="btn fb-button btn-lg mb-2" type="submit">
              <i className="fab fa-facebook-f me-2"></i>Sign in with Facebook
            </button>
          </form>
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
