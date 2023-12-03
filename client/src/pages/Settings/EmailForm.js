import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import {
  changeEmailAction,
  changeEmailAlert,
  selectAuth,
} from "../../_store/reducers/authSlice";

const EmailForm = () => {
  const dispatch = useDispatch();
  const { emailAlert, userProfile: profile } = useSelector(selectAuth);
  const [newEmail, setNewEmail] = useState("");
  const [newEmailpw, setNewEmailpw] = useState("");
  const [newEmailAlert, setNewEmailAlert] = useState("");

  const handleEmailChangeButton = async (e) => {
    e.preventDefault();
    setNewEmailAlert("");
    dispatch(changeEmailAlert(""));

    if (newEmail === profile.email) {
      setNewEmailAlert("That's the same email");
      return;
    }

    if (!EmailValidator.validate(newEmail)) {
      setNewEmailAlert("Invalid email");
      return;
    }

    if (newEmailpw === "") {
      setNewEmailAlert("Password field cannot be empty");
      return;
    }

    try {
      dispatch(changeEmailAction(newEmail, newEmailpw));
      setNewEmail("");
      setNewEmailpw("");
    } catch (err) {
      console.log(err);
      setNewEmailAlert("Something went wrong, please try again later");
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

    if (newEmailAlert !== "") {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {newEmailAlert}
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
          name="changeEmail"
          id="changeEmail"
          type="email"
          className="form-control form-control-lg"
          placeholder="name@example.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <label style={{ opacity: "0.5" }} htmlFor="changeEmail">
          New Email
        </label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          className="form-control form-control-lg"
          placeholder="Confirm password"
          value={newEmailpw}
          onChange={(e) => setNewEmailpw(e.target.value)}
          required
        />
        <label style={{ opacity: "0.5" }} htmlFor="confirmPassword">
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
