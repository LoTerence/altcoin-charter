import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deauthenticate, signOut } from "../_store/reducers/authSlice";

const SignOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(deauthenticate());
    dispatch(signOut());
  }, [dispatch]);

  return <h1>You have been logged out</h1>;
};

export default SignOut;
