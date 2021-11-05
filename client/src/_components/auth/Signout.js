import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { signOutAction } from "../../_store/reducers/authSlice";
import { useWithRouter } from "./useWithRouter";

function Signout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutAction());
  }, [dispatch]); // do I need to include this [dispatch] ?

  return (
    <div>
      <h1>You have been logged out</h1>
    </div>
  );
}

export default useWithRouter(Signout);
