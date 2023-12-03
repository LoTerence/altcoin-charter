import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../_store/reducers/authSlice";
import PrivateRoute from "./PrivateRoute";

function SignOut() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(signOut());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <h1>You have been logged out</h1>
    </PrivateRoute>
  );
}

export default SignOut;
