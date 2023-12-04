import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { changeEmail, selectAuth } from "../../_store/reducers/authSlice";
import { SpinnerIcon } from "../../_components/icons";

// TODO: better styling

const EmailForm = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(selectAuth);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChangeButton = async (e) => {
    e.preventDefault();
    setAlert(null);
    setIsLoading(true);
    try {
      validateForm({ newEmail, password, userProfile });
      await dispatch(changeEmail({ newEmail, password })).unwrap();
      setNewEmail("");
    } catch (err) {
      setAlert(err?.message || "Something went wrong, please try again later");
    }
    setPassword("");
    setIsLoading(false);
  };

  return (
    <div>
      <h5>Change Email</h5>
      <p>
        Your email: <b>{userProfile.email}</b>
      </p>
      <div className="form-floating mb-4">
        <input
          className="form-control form-control-lg"
          disabled={isLoading}
          id="emailField"
          name="newemail"
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="name@example.com"
          required
          type="email"
          value={newEmail}
        />
        <label className="opacity-50" htmlFor="emailField">
          New Email
        </label>
      </div>
      <div className="form-floating mb-4">
        <input
          className="form-control form-control-lg"
          disabled={isLoading}
          id="confirmPasswordField"
          name="confirmPassword"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Confirm password"
          required
          type="password"
          value={password}
        />
        <label className="opacity-50" htmlFor="confirmPasswordField">
          Password
        </label>
      </div>
      <button
        className="btn btn-secondary btn-md btn-block"
        disabled={isLoading}
        onClick={(e) => handleEmailChangeButton(e)}
      >
        {isLoading ? <SpinnerIcon /> : "Submit email change"}
      </button>
      {alert && <div className="alert alert-danger">{alert}</div>}
    </div>
  );
};

export default EmailForm;

const validateForm = ({ newEmail, password, userProfile }) => {
  if (newEmail === "") throw new Error("Email field cannot be empty");
  if (newEmail === userProfile.email) throw new Error("That's the same email");
  if (!EmailValidator.validate(newEmail)) throw new Error("Invalid email");
  if (password === "") throw new Error("Password field cannot be empty");
  return true;
};
