import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccountAction,
  selectAuth,
} from "../../_store/reducers/authSlice";

// TODO: add loading state
// TODO: better styling

const DeleteAccountForm = () => {
  const dispatch = useDispatch();
  const { daAlert } = useSelector(selectAuth);
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAccountButton = async (e) => {
    e.preventDefault();

    if (password === "") {
      return setAlert("Password field empty");
    }

    setAlert(null);
    try {
      dispatch(deleteAccountAction(password));
      setPassword("");
    } catch (err) {
      console.log(err);
      setAlert("Something went wrong please try again later");
    }
  };

  const renderDeleteAlert = () => {
    if (daAlert) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {daAlert}
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
      <h5>Danger zone</h5>
      {isOpen ? (
        <>
          <div className="alert alert-danger">
            WARNING: This action cannot be reversed. If you are sure you want to
            delete your account, confirm your password and continue. Otherwise,
            click cancel.
          </div>
          <div className="form-floating mb-4">
            <input
              className="form-control form-control-lg"
              id="passwordField"
              name="passwordField"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm password"
              required
              type="password"
              value={password}
            />
            <label className="opacity-50" htmlFor="passwordField">
              Confirm password
            </label>
          </div>
          <button
            className="btn btn-danger btn-md btn-block mr-1"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="btn btn-secondary btn-md btn-block"
            onClick={(e) => handleDeleteAccountButton(e)}
          >
            Continue to delete account
          </button>
        </>
      ) : (
        <button
          className="btn btn-danger btn-md btn-block"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          Delete account
        </button>
      )}
      {renderDeleteAlert()}
    </div>
  );
};

export default DeleteAccountForm;
