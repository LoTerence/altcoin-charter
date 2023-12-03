import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import {
  signIn,
  selectAuth,
  googleSignInAction,
  fbSignInAction,
} from "../_store/reducers/authSlice";
import { FacebookIcon, GoogleIcon } from "../_components/icons";

const validateForm = ({ email, password }) => {
  if (email === "") throw new Error("Email field should not be empty");
  if (!EmailValidator.validate(email)) throw new Error("Invalid email");
  if (password === "") throw new Error("Password field should not be empty");
  if (password.length < 8)
    throw new Error("Password should be at least 8 characters");
  return true;
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feature");
    }
  }, [isAuthenticated, navigate]);

  // TODO: add a loading indicator
  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      validateForm({ email, password });
      await dispatch(signIn({ email, password })).unwrap();
    } catch (err) {
      setError(err?.message || "Failed to log in");
    }
  }

  async function handleGoogleButtonClick(e) {
    e.preventDefault();
    try {
      dispatch(googleSignInAction());
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }
  }

  async function handleFbButtonClick(e) {
    e.preventDefault();
    try {
      dispatch(fbSignInAction());
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
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
            {error && (
              <div className="alert alert-danger">
                <strong>Oops! </strong>
                {error}
              </div>
            )}
            <button
              className="btn btn-success btn-lg btn-block container-fluid"
              onClick={(e) => handleFormSubmit(e)}
            >
              Sign in
            </button>
          </form>
          <hr className="my-4" />
          <button
            className="btn google-button btn-lg mb-2"
            type="submit"
            onClick={(e) => handleGoogleButtonClick(e)}
          >
            <GoogleIcon /> Sign in with Google
          </button>
          <button
            className="btn fb-button btn-lg mb-2"
            type="submit"
            onClick={(e) => handleFbButtonClick(e)}
          >
            <FacebookIcon /> Sign in with Facebook
          </button>
          <br />
          <p>
            Dont have an account? Click <Link to="/signup">here</Link> to sign
            up!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
