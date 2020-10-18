import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signOutAction } from "../../_store/reducers/authSlice";

function Signout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutAction());
  });

  return (
    <div>
      <h1>You have been logged out</h1>
    </div>
  );
}

export default withRouter(Signout);
