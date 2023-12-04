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
import { FacebookIcon, GoogleIcon, SpinnerIcon } from "../_components/icons";

// TODO: remember me checkbox doesnt do anything

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feature");
    }
  }, [isAuthenticated, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    try {
      validateForm({ email, password });
      await dispatch(signIn({ email, password })).unwrap();
    } catch (err) {
      setError(err?.message || "Failed to log in");
    }
    setIsLoading(false);
  };

  const handleGoogleButtonClick = async (e) => {
    e.preventDefault();
    try {
      dispatch(googleSignInAction());
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }
  };

  const handleFbButtonClick = async (e) => {
    e.preventDefault();
    try {
      dispatch(fbSignInAction());
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5 h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <form className="text-center">
          <h1 className="mb-4">Sign in</h1>
          {/* Email Input */}
          <div className="form-floating mb-4">
            <input
              autoComplete="email"
              className="form-control form-control-lg"
              disabled={isLoading}
              id="signinEmail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              type="email"
              value={email}
            />
            <label className="opacity-50" htmlFor="signinEmail">
              Email
            </label>
          </div>
          {/* Password Input */}
          <div className="form-floating mb-4">
            <input
              autoComplete="current-password"
              className="form-control form-control-lg"
              disabled={isLoading}
              id="signinPassword"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              type="password"
              value={password}
            />
            <label className="opacity-50" htmlFor="signinPassword">
              Password
            </label>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* <!-- Checkbox --> */}
            <div className="form-check">
              <input
                className="form-check-input"
                id="signInCheck"
                type="checkbox"
                value=""
              />
              <label className="form-check-label" htmlFor="signInCheck">
                Remember me
              </label>
            </div>
            {/* <Link to="#!">Forgot password?</Link> */}
          </div>
          <button
            className="btn btn-success btn-lg btn-block mb-4"
            disabled={isLoading}
            onClick={(e) => handleFormSubmit(e)}
            style={{ width: "calc(100% - 34px)" }}
          >
            {isLoading ? <SpinnerIcon /> : "Log in"}
          </button>
          {error && (
            <div className="alert alert-danger">
              <strong>Oops! </strong>
              {error}
            </div>
          )}
        </form>
        <hr className="my-4" />
        <button
          className="btn google-button btn-lg mb-2"
          onClick={(e) => handleGoogleButtonClick(e)}
          style={{ width: "calc(100% - 34px)" }}
          type="submit"
        >
          <GoogleIcon /> Sign in with Google
        </button>
        <button
          className="btn fb-button btn-lg mb-2"
          onClick={(e) => handleFbButtonClick(e)}
          style={{ width: "calc(100% - 34px)" }}
          type="submit"
        >
          <FacebookIcon /> Sign in with Facebook
        </button>
        <br />
        <p>
          Dont have an account? Click <Link to="/signup">here</Link> to sign up!
        </p>
      </div>
    </div>
  );
};

const validateForm = ({ email, password }) => {
  if (email === "") throw new Error("Email field should not be empty");
  if (!EmailValidator.validate(email)) throw new Error("Invalid email");
  if (password === "") throw new Error("Password field should not be empty");
  if (password.length < 8)
    throw new Error("Password should be at least 8 characters");
  return true;
};

export default SignIn;
