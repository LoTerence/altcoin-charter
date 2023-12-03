import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import {
  changeEmailAction,
  changeEmailAlert,
  selectAuth,
} from "../../_store/reducers/authSlice";

// TODO: add loading state
// TODO: better styling

const EmailForm = () => {
  const dispatch = useDispatch();
  const { emailAlert, userProfile: profile } = useSelector(selectAuth);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const handleEmailChangeButton = async (e) => {
    e.preventDefault();
    dispatch(changeEmailAlert(""));

    try {
      validateForm({ newEmail, password, profile });
    } catch (err) {
      setAlert(err?.message || "Something went wrong, please try again later");
      return;
    }

    setAlert(null);
    try {
      dispatch(changeEmailAction(newEmail, password));
      setNewEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
      setAlert("Something went wrong, please try again later");
    }
  };

  const renderEmailAlert = () => {
    if (emailAlert) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong>
          {emailAlert}
        </div>
      );
    }

    if (alert) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {alert}
        </div>
      );
    }
  };

  return (
    <div>
      <h5>Change Email</h5>
      <p>
        Your email: <b>{profile.email}</b>
      </p>
      <div className="form-floating mb-4">
        <input
          className="form-control form-control-lg"
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
        onClick={(e) => handleEmailChangeButton(e)}
      >
        Submit email change
      </button>
      {renderEmailAlert()}
    </div>
  );
};

export default EmailForm;

const validateForm = ({ newEmail, password, profile }) => {
  if (newEmail === profile.email) throw new Error("That's the same email");
  if (!EmailValidator.validate(newEmail)) throw new Error("Invalid email");
  if (password === "") throw new Error("Password field cannot be empty");
  return true;
};
