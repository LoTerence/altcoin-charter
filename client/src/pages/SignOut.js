import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deauthenticate } from "../_store/reducers/authSlice";

const SignOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(deauthenticate());
  }, [dispatch]);

  return <h1>You have been logged out</h1>;
};

export default SignOut;
