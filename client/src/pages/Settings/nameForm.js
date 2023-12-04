import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, selectAuth } from "../../_store/reducers/authSlice";
import { SpinnerIcon } from "../../_components/icons";

// TODO: better styling

const NameForm = () => {
  const dispatch = useDispatch();
  const { userProfile: profile } = useSelector(selectAuth);
  const [newName, setNewName] = useState("");
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChangeButton = async (e) => {
    e.preventDefault();
    setAlert(null);
    setIsLoading(true);
    try {
      validateForm({ name: newName, profile });
      await dispatch(changeName({ newName })).unwrap();
      setNewName("");
    } catch (err) {
      setAlert(err?.message || "Something went wrong, please try again later");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h5>Change Name</h5>
      <p>
        Your name: <b>{profile.name}</b>
      </p>
      <div className="form-floating mb-4">
        <input
          className="form-control form-control-lg"
          disabled={isLoading}
          id="nameField"
          name="newname"
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Change Name"
          required
          type="text"
          value={newName}
        />
        <label className="opacity-50" htmlFor="nameField">
          Change Name
        </label>
      </div>
      <button
        className="btn btn-secondary btn-md btn-block"
        disabled={isLoading}
        onClick={(e) => handleNameChangeButton(e)}
      >
        {isLoading ? <SpinnerIcon /> : "Submit name change"}
      </button>
      {alert && <div className="alert alert-danger">{alert}</div>}
    </div>
  );
};

export default NameForm;

const validateForm = ({ name, profile }) => {
  if (name === "") throw new Error("Name cannot be empty");
  if (name === profile.name) throw new Error("Thats the same name");
  return true;
};
