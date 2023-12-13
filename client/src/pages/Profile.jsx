import { useSelector } from "react-redux";
import { selectAuth } from "../_store/reducers/authSlice";

const Profile = () => {
  const { userProfile: profile } = useSelector(selectAuth);

  return (
    <>
      <h1 className="mb-4">Profile</h1>
      <p>
        Name: <b>{profile.name}</b>
      </p>
      <p>
        Email: <b>{profile.email}</b>
      </p>
    </>
  );
};

export default Profile;
