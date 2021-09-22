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
      <div className="container flex-wrap flex-md-nowrap">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            {" "}
            Altcoin Charter{" "}
          </Link>
        </div>
        <ul className="nav navbar-nav">{renderLinks()}</ul>
      </div>
    </nav>
  );
}

export default Header;
