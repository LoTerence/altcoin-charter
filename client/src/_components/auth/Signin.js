import React, { useState } from "react";
import { Link, withRouter, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, selectAuth } from "../../_store/reducers/authSlice";

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
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              {/* Email Input */}
              <div className="form-outline mb-4">
                <input
                  name="email"
                  id="signinEmail"
                  type="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="signinEmail">
                  Email address
                </label>
              </div>

              {/* Password Input */}
              <div className="form-outline mb-4">
                <input
                  name="password"
                  id="signinPassword"
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="signinPassword">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* <!-- Checkbox --> */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="signinCheck"
                    checked
                  />
                  <label className="form-check-label" htmlFor="signinCheck">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <Link to="#!">Forgot password?</Link>
              </div>

              {renderAlert()}

              {/* submit button */}
              <button
                className="btn btn-primary btn-lg btn-block mb-3"
                onClick={(e) => handleFormSubmit(e)}
              >
                Sign in
              </button>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
              </a>
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#55acee" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter me-2"></i>Continue with Twitter
              </a>
            </form>
          </div>
          <p>
            Dont have an account? Click <Link to="/signup">here</Link> to sign
            up!
          </p>
        </div>
      </div>
    </section>
  );
}

export default withRouter(Signin);
// sign in form template can be found on:
// https://mdbootstrap.com/docs/standard/extended/login/
