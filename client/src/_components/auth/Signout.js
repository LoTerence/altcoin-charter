import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../_store/reducers/authSlice";
import PrivateRoute from "./PrivateRoute";

function Signout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutAction());
  }, [dispatch]); // TODO: do I need to include this [dispatch] ?

  return (
    <PrivateRoute>
      <h1>You have been logged out</h1>
    </PrivateRoute>
  );
}

export default Signout;
