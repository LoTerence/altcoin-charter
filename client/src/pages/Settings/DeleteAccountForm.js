import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccountAction,
  selectAuth,
} from "../../_store/reducers/authSlice";

const DeleteAccountForm = () => {
  const dispatch = useDispatch();
  const { daAlert } = useSelector(selectAuth);
  const [password, setPassword] = useState("");
  const [deleteAccountAlert, setDeleteAccountAlert] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAccountButton = async (e) => {
    e.preventDefault();
    setDeleteAccountAlert("");

    if (password === "") {
      setDeleteAccountAlert("Password field empty");
      return;
    }

    try {
      dispatch(deleteAccountAction(password));
      setPassword("");
    } catch (err) {
      console.log(err);
      setDeleteAccountAlert("Something went wrong please try again later");
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

    if (deleteAccountAlert) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {deleteAccountAlert}
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
              name="passwordField"
              id="passwordField"
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirm password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label style={{ opacity: "0.5" }} htmlFor="passwordField">
              Confirm password
            </label>
          </div>
          <button
            className="btn btn-danger btn-md btn-block"
            style={{ marginRight: "5px" }}
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
