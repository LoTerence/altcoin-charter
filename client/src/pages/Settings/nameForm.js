import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNameAction, selectAuth } from "../../_store/reducers/authSlice";

const NameForm = () => {
  const dispatch = useDispatch();
  const { userProfile: profile } = useSelector(selectAuth);
  const [newName, setNewName] = useState("");
  const [newNameAlert, setNewNameAlert] = useState("");

  const handleNameChangeButton = async (e) => {
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
  };

  return (
    <div>
      <h5>Change Name</h5>
      <p>
        Your name: <b>{profile.name}</b>{" "}
      </p>
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
        className="btn btn-secondary btn-md btn-block"
        onClick={(e) => handleNameChangeButton(e)}
      >
        Submit name change
      </button>
      {newNameAlert === "" ? <br /> : <p>{newNameAlert}</p>}
    </div>
  );
};

export default NameForm;
