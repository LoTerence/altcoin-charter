import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../_store/reducers/authSlice";
import { SpinnerIcon } from "../../_components/icons";

// TODO: better styling

const DeleteAccountForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccountButton = async (e) => {
    e.preventDefault();
    if (password === "") return setAlert("Password field empty");
    setAlert(null);
    setIsLoading(true);
    try {
      await dispatch(deleteAccount({ password })).unwrap();
    } catch (err) {
      setAlert(err?.message || "Something went wrong please try again later");
    } finally {
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div className="mb-4">
      <h5>Danger zone</h5>
      {isOpen ? (
        <>
          <div className="alert alert-danger font-bold">
            WARNING: This action cannot be reversed. If you are sure you want to
            delete your account, confirm your password and continue. Otherwise,
            click cancel.
          </div>
          <div className="form-floating mb-4">
            <input
              className="form-control form-control-lg"
              disabled={isLoading}
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
            className="btn btn-danger btn-md btn-block mr-1 font-bold"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="btn btn-secondary btn-md btn-block"
            disabled={isLoading || password === ""}
            onClick={(e) => handleDeleteAccountButton(e)}
          >
            {isLoading ? <SpinnerIcon /> : "Continue to delete account"}
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
      {alert && <div className="alert alert-danger">{alert}</div>}
    </div>
  );
};

export default DeleteAccountForm;
