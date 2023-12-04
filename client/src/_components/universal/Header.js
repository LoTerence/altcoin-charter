import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

const authNavs = [
  { id: 0, text: "Settings", linkTo: "/settings" },
  { id: 1, text: "Sign Out", linkTo: "/signout" },
];

const publicNavs = [
  { id: 0, text: "Sign in", linkTo: "/signin" },
  { id: 1, text: "Sign up", linkTo: "/signup" },
];

function Header() {
  const { isAuthenticated } = useSelector(selectAuth);
  const navs = isAuthenticated ? authNavs : publicNavs;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-success mb-2">
      <div className="container d-flex justify-content-start">
        <Link className="navbar-brand" to="/">
          Altcoin Charter
        </Link>
        <ul className="navbar-nav mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/feature">
              Watchlist
            </Link>
          </li>
          <li className="nav-item dropdown">
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
        </ul>
      </div>
    </nav>
  );
}

export default Header;
