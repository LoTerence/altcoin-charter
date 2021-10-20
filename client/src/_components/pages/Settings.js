/* Settings.js
 *  Component that shows allows user to change name, email, or password
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  changeNameAction,
  changeEmailAction,
  changePasswordAction,
  selectAuth,
} from "../../_store/reducers/authSlice";
import * as EmailValidator from "email-validator";

const Settings = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectAuth).userProfile;
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newNameAlert, setNewNameAlert] = useState("");
  const [newEmailAlert, setNewEmailAlert] = useState("");
  const [newPasswordAlert, setNewPasswordAlert] = useState("");

  useEffect(() => {
    if (profile.email === "") {
      dispatch(getProfile());
    }
  }, [dispatch]);

  async function handleNameChangeButton(e) {
    e.preventDefault();

    if (newName === "") {
      setNewNameAlert("Name cannot be empty");
      return;
    }

    if (newName === profile.name) {
      setNewNameAlert("Thats the same name");
      return;
    }

    try {
      dispatch(changeNameAction(newName));
      setNewName("");
    } catch (err) {
      console.log(err);
      setNewNameAlert("Something went wrong, please try again later");
    }
  }

  async function handleEmailChangeButton(e) {
    e.preventDefault();

    if (newEmail === profile.email) {
      setNewEmailAlert("Thats the same email");
      return;
    }

    if (!EmailValidator.validate(newEmail)) {
      setNewEmailAlert("Invalid email");
      return;
    }

    try {
      dispatch(changeEmailAction(newEmail));
      setNewEmail("");
    } catch (err) {
      console.log(err);
      setNewEmailAlert("Something went wrong, please try again later");
    }
  }

  async function handlePasswordChangeButton(e) {
    e.preventDefault();

    if (newPassword1 === "") {
      setNewPasswordAlert("Password field empty");
      return;
    }

    if (newPassword1 !== newPassword2) {
      setNewPasswordAlert("Passwords do not match");
      return;
    }

    try {
      dispatch(changePasswordAction(newPassword1));
      setNewPassword1("");
      setNewPassword2("");
    } catch (err) {
      console.log(err);
      setNewPasswordAlert("Something went wrong please try again later");
    }
  }

  return (
    <div className="container">
      <p>Your name: </p>
      <p>{profile.name}</p>
      <p>Change name </p>
      <div className="form-floating mb-4">
        <input
          name="changeName"
          id="changeName"
          type="text"
          className="form-control form-control-lg"
          placeholder="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <label style={{ opacity: "0.5" }} htmlFor="changeName">
          Change Name
        </label>
      </div>
      <button
        className="btn btn-secondary btn-lg btn-block container-fluid"
        onClick={(e) => handleNameChangeButton(e)}
      >
        Submit name change
      </button>
      {newNameAlert === "" ? <br /> : <p>{newNameAlert}</p>}
      <br />
      <p>Your email </p>
      <p>{profile.email}</p>
      <p>Change email </p>
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
          Change Email
        </label>
      </div>
      <button
        className="btn btn-secondary btn-lg btn-block container-fluid"
        onClick={(e) => handleEmailChangeButton(e)}
      >
        Submit email change
      </button>
      {newEmailAlert === "" ? <br /> : <p>{newEmailAlert}</p>}
      <br />
      <p>Change password </p>
      <div className="form-floating mb-4">
        <input
          name="changePassword1"
          id="changePassword1"
          type="password"
          className="form-control form-control-lg"
          placeholder="change password"
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
          required
        />
        <label style={{ opacity: "0.5" }} htmlFor="changePassword1">
          Type new password
        </label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="changePassword2"
          id="changePassword2"
          type="password"
          className="form-control form-control-lg"
          placeholder="retype password"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          required
        />
        <label style={{ opacity: "0.5" }} htmlFor="changePassword2">
          Re-type password
        </label>
      </div>
      <button
        className="btn btn-secondary btn-lg btn-block container-fluid"
        onClick={(e) => handlePasswordChangeButton(e)}
      >
        Submit password change
      </button>
      {newPasswordAlert === "" ? <br /> : <p>{newPasswordAlert}</p>}
    </div>
  );
};

export default Settings;
