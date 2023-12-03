import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordAction,
  selectAuth,
} from "../../_store/reducers/authSlice";

const PasswordForm = () => {
  const dispatch = useDispatch();
  const { pwAlert } = useSelector(selectAuth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newPasswordAlert, setNewPasswordAlert] = useState("");

  const handlePasswordChangeButton = async (e) => {
    e.preventDefault();
    setNewPasswordAlert("");

    if (oldPassword === "") {
      setNewPasswordAlert("Old Password field empty");
      return;
    }

    if (newPassword1 === "") {
      setNewPasswordAlert("New Password field empty");
      return;
    }

    if (newPassword1.length < 6) {
      setNewPasswordAlert("Password should be at least 6 characters");
      return;
    }

    if (newPassword1 !== newPassword2) {
      setNewPasswordAlert("Passwords do not match");
      return;
    }

    try {
      dispatch(changePasswordAction(oldPassword, newPassword1));
      setNewPassword1("");
      setNewPassword2("");
    } catch (err) {
      console.log(err);
      setNewPasswordAlert("Something went wrong please try again later");
    }
  };

  const renderPasswordAlert = () => {
    if (pwAlert) {
      return <div className="alert alert-danger">{pwAlert}</div>;
    }

    if (newPasswordAlert !== "") {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {newPasswordAlert}
        </div>
      );
    }
  };

  return (
    <div>
      <h5>Change password </h5>
      <div className="form-floating mb-4">
        <input
          name="changePassword0"
          id="changePassword0"
          type="password"
          className="form-control form-control-lg"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <label style={{ opacity: "0.5" }} htmlFor="changePassword0">
          Old password
        </label>
      </div>
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
          New password
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
          Confirm new password
        </label>
      </div>
      <button
        className="btn btn-secondary btn-md btn-block"
        onClick={(e) => handlePasswordChangeButton(e)}
      >
        Submit password change
      </button>
      {renderPasswordAlert()}
    </div>
  );
};

export default PasswordForm;
