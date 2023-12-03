import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNameAction, selectAuth } from "../../_store/reducers/authSlice";

// TODO: add loading state
// TODO: better styling

const NameForm = () => {
  const dispatch = useDispatch();
  const { userProfile: profile } = useSelector(selectAuth);
  const [newName, setNewName] = useState("");
  const [alert, setAlert] = useState(null);

  const handleNameChangeButton = async (e) => {
    e.preventDefault();
    setAlert("");

    try {
      validateForm({ name: newName, profile });
    } catch (err) {
      setAlert(err?.message || "Something went wrong, please try again later");
      return;
    }

    try {
      dispatch(changeNameAction(newName));
      setNewName("");
    } catch (err) {
      console.log(err);
      setAlert("Something went wrong, please try again later");
    }
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
        onClick={(e) => handleNameChangeButton(e)}
      >
        Submit name change
      </button>
      {alert && <p>{alert}</p>}
    </div>
  );
};

export default NameForm;

const validateForm = ({ name, profile }) => {
  if (name === "") throw new Error("Name cannot be empty");
  if (name === profile.name) throw new Error("Thats the same name");
  return true;
};
