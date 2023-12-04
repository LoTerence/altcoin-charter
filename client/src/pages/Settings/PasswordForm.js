import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../_store/reducers/authSlice";
import { SpinnerIcon } from "../../_components/icons";

// TODO: better styling

const PasswordForm = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPwConfirmation, setNewPwConfirmation] = useState("");
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChangeButton = async (e) => {
    e.preventDefault();
    setAlert(null);
    setIsLoading(true);
    try {
      validateForm({ oldPassword, newPassword, newPwConfirmation });
      const { success } = await dispatch(
        changePassword({ oldPassword, newPassword })
      ).unwrap();
      setOldPassword("");
      setNewPassword("");
      setNewPwConfirmation("");
      if (success) {
        setAlert("Password successfully changed!");
      }
    } catch (err) {
      setAlert(err?.message || "Something went wrong please try again later");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h5>Change password </h5>
      <div className="form-floating mb-4">
        <input
          className="form-control form-control-lg"
          disabled={isLoading}
          id="changePassword0"
          name="changePassword0"
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old password"
          required
          type="password"
          value={oldPassword}
        />
        <label className="opacity-50" htmlFor="changePassword0">
          Old password
        </label>
      </div>
      <div className="form-floating mb-4">
        <input
          className="form-control form-control-lg"
          disabled={isLoading}
          id="changePassword1"
          name="changePassword1"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="change password"
          required
          type="password"
          value={newPassword}
        />
        <label className="opacity-50" htmlFor="changePassword1">
          New password
        </label>
      </div>
      <div className="form-floating mb-4">
        <input
          className="form-control form-control-lg"
          disabled={isLoading}
          id="changePassword2"
          name="changePassword2"
          onChange={(e) => setNewPwConfirmation(e.target.value)}
          placeholder="retype password"
          required
          type="password"
          value={newPwConfirmation}
        />
        <label className="opacity-50" htmlFor="changePassword2">
          Confirm new password
        </label>
      </div>
      <button
        className="btn btn-secondary btn-md btn-block"
        disabled={isLoading}
        onClick={(e) => handlePasswordChangeButton(e)}
      >
        {isLoading ? <SpinnerIcon /> : "Submit password change"}
      </button>
      {alert && <div className="alert alert-danger">{alert}</div>}
    </div>
  );
};

export default PasswordForm;

const validateForm = ({ oldPassword, newPassword, newPwConfirmation }) => {
  if (oldPassword === "") throw new Error("Password field empty");
  if (newPassword === "") throw new Error("New Password field empty");
  if (newPassword.length < 8)
    throw new Error("Password should be at least 8 characters");
  if (newPwConfirmation === "")
    throw new Error("Please confirm new password by typing it again");
  if (newPassword !== newPwConfirmation)
    throw new Error("Passwords do not match");
  return true;
};
