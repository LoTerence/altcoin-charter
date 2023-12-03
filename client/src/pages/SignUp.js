import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import { signUp, selectAuth } from "../_store/reducers/authSlice";
import { SpinnerIcon } from "../_components/icons";

// TODO: add facebook and google oauth buttons?

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      validateForm({ email, newPassword, confirmPassword });
      await dispatch(signUp({ email, password: newPassword })).unwrap();
    } catch (err) {
      setError(err?.message || "Failed to sign up");
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5 h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <form className="text-center">
          <h3 className="mb-5">
            Sign up for Altcoin Charter to save a personal watchlist!
          </h3>
          {/* Email Input */}
          <div className="form-floating mb-4">
            <input
              autoComplete="email"
              className="form-control form-control-lg"
              id="signUpEmail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              type="email"
              value={email}
            />
            <label className="opacity-50" htmlFor="signUpEmail">
              Email
            </label>
          </div>
          {/* Password Inputs */}
          <div className="form-floating mb-4">
            <input
              autoComplete="new-password"
              className="form-control form-control-lg"
              id="signUpPassword"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="password"
              type="password"
              value={newPassword}
            />
            <label className="opacity-50" htmlFor="signUpPassword">
              Password:
            </label>
          </div>
          <div className="form-floating mb-4">
            <input
              autoComplete="new-password"
              className="form-control form-control-lg"
              id="signupPassword2"
              name="passwordConfirm"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirmPassword"
              type="password"
              value={confirmPassword}
            />
            <label className="opacity-50" htmlFor="signupPassword2">
              Confirm Password:
            </label>
          </div>
          <button
            className="btn btn-success btn-lg btn-block container-fluid mb-4"
            disabled={isLoading}
            onClick={(e) => handleFormSubmit(e)}
            style={{ width: "calc(100% - 34px)" }}
          >
            {isLoading ? <SpinnerIcon /> : "Sign Up"}
          </button>
          {error && (
            <div className="alert alert-danger">
              <strong>Oops! </strong>
              {error}
            </div>
          )}
        </form>
        <hr className="my-4" />
        <p>
          Already have an account? Click <Link to="/signin">here</Link> to sign
          in!
        </p>
      </div>
    </div>
  );
};

export default SignUp;

const validateForm = ({ email, newPassword, confirmPassword }) => {
  if (email === "") throw new Error("Email field should not be empty");
  if (!EmailValidator.validate(email)) throw new Error("Invalid email");
  if (newPassword === "") throw new Error("Password field empty");
  if (newPassword.length < 6)
    throw new Error("Password length should be at least 6 characters");
  if (newPassword !== confirmPassword)
    throw new Error("Passwords do not match!");
  return true;
};
