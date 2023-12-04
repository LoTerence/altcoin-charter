import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

const authNavs = [
  { id: 0, text: "Profile", linkTo: "/profile" },
  { id: 1, text: "Settings", linkTo: "/settings" },
  { id: 2, text: "Log Out", linkTo: "/signout" },
];

const publicNavs = [
  { id: 0, text: "Sign in", linkTo: "/signin" },
  { id: 1, text: "Sign up", linkTo: "/signup" },
];

function Header() {
  const { isAuthenticated } = useSelector(selectAuth);
  const navs = isAuthenticated ? authNavs : publicNavs;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success mb-2">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          Altcoin Charter
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto mt-2 mt-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feature">
                Watchlist
              </Link>
            </li>
            <li className="nav-item dropdown d-none d-md-block">
              <button
                aria-haspopup="true"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                id="navbarDropdown"
                type="button"
              >
                Account
              </button>
              <div
                aria-labelledby="navbarDropdown"
                className="dropdown-menu min-w-fit"
              >
                {navs.map((nav) => (
                  <Link className="dropdown-item" key={nav.id} to={nav.linkTo}>
                    {nav.text}
                  </Link>
                ))}
              </div>
            </li>
            {navs.map((nav) => (
              <li className="nav-item d-md-none" key={nav.id}>
                <Link className="nav-link" to={nav.linkTo}>
                  {nav.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
