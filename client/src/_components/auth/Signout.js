import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deauthenticate } from "../../_store/reducers/authSlice";
import PrivateRoute from "./PrivateRoute";

const SignOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(deauthenticate());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <h1>You have been logged out</h1>
    </PrivateRoute>
  );
};

export default SignOut;
