import React, { useState } from "react";
import { Link, withRouter, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, selectAuth } from "../../_store/reducers/authSlice";

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authSelector = useSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  if (authSelector.authenticated) {
    return <Redirect to={"/feature"} />;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (email === "") {
      setIsError(true);
    } else {
      try {
        dispatch(signInAction(history, { email, password }));
      } catch (err) {
        setIsError(true);
      }
    }
  }

  function renderAlert() {
    if (isError || authSelector.error !== "") {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          {authSelector.error}
        </div>
      );
    }
  }

  return (
    <div className="col-md-8 col-md-offset-2">
      <form>
        <h2>Sign into Altcoin Charter</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {renderAlert()}
        <button
          className="btn btn-primary"
          onClick={(e) => handleFormSubmit(e)}
        >
          Sign in
        </button>
      </form>
      <h4>
        Dont have an account? Click{" "}
        <Link className="nav-link" to="/signup">
          here
        </Link>{" "}
        to sign up!
      </h4>
    </div>
  );
}

export default withRouter(Signin);
