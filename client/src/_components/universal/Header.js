import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

function Header() {
  const authenticated = useSelector(selectAuth).authenticated;

  function renderLinks() {
    if (authenticated) {
      return [
        <li key="0" className="nav-item">
          {" "}
          <Link className="nav-link" to="/signout">
            Sign Out{" "}
          </Link>
        </li>,
        <li key="1" className="nav-item">
          {" "}
          <Link className="nav-link" to="/feature">
            Personal Watchlist{" "}
          </Link>
        </li>,
        <li key="2" className="nav-item">
          {" "}
          <Link className="nav-link" to="/settings">
            Settings{" "}
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key="0" className="nav-item">
          <Link className="nav-link" to="/signin">
            {" "}
            Sign in{" "}
          </Link>
        </li>,
        <li key="1" className="nav-item">
          <Link className="nav-link" to="/signup">
            {" "}
            Sign up
          </Link>
        </li>,
        <li key="2" className="nav-item">
          {" "}
          <Link className="nav-link" to="/feature">
            Personal Watchlist{" "}
          </Link>
        </li>,
      ];
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success mb-2">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand">
          {" "}
          Altcoin Charter{" "}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav">{renderLinks()}</ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
