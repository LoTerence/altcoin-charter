import React, { useState } from "react";
import { Link, withRouter, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, selectAuth } from "../../_store/reducers/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authSelector = useSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  if (authSelector.authenticated) {
    return <Redirect to={"/feature"} />;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (email === "") {
      setIsError(true);
    } else {
      try {
        dispatch(signInAction(history, { email, password }));
      } catch (err) {
        setIsError(true);
      }
    }
  }

  function renderAlert() {
    if (isError || authSelector.error !== "") {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {authSelector.error}
        </div>
      );
    }
  }

  return (
    <div className="container py-5 h-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <form className="text-center">
            <h3 className="mb-5">Sign in</h3>

            {/* Email Input */}
            <div className="form-floating mb-4">
              <input
                name="email"
                id="signinEmail"
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label style={{ opacity: "0.5" }} htmlFor="signinEmail">
                Email
              </label>
            </div>

            {/* Password Input */}
            <div className="form-floating mb-4">
              <input
                name="password"
                id="signinPassword"
                type="password"
                className="form-control form-control-lg"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label style={{ opacity: "0.5" }} htmlFor="signinPassword">
                Password
              </label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* <!-- Checkbox --> */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="signinCheck"
                />
                <label className="form-check-label" htmlFor="signinCheck">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
              {/* <Link to="#!">Forgot password?</Link> */}
            </div>

            {renderAlert()}

            {/* submit button */}
            <button
              className="btn btn-success btn-lg btn-block container-fluid"
              onClick={(e) => handleFormSubmit(e)}
            >
              Sign in
            </button>

            <hr className="my-4" />

            <button className="btn google-button btn-lg mb-2" type="submit">
              <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
            </button>
            <button className="btn fb-button btn-lg mb-2" type="submit">
              <FontAwesomeIcon icon={faFacebook} /> Sign in with Facebook
            </button>
          </form>
          <br />
          <p>
            Dont have an account? Click <Link to="/signup">here</Link> to sign
            up!
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signin);
// sign in form template can be found on:
// https://mdbootstrap.com/docs/standard/extended/login/
