import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

const authNavs = [
  { id: 0, text: "Sign Out", linkTo: "/signout" },
  { id: 1, text: "Personal Watchlist", linkTo: "/feature" },
  { id: 2, text: "Settings", linkTo: "/settings" },
];

const publicNavs = [
  { id: 0, text: "Sign in", linkTo: "/signin" },
  { id: 1, text: "Sign up", linkTo: "/signup" },
  { id: 2, text: "Personal Watchlist", linkTo: "/feature" },
];

function Header() {
  const { isAuthenticated } = useSelector(selectAuth);
  const navs = isAuthenticated ? authNavs : publicNavs;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success mb-2">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand">
          Altcoin Charter
        </Link>

        <button
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {navs.map((nav) => (
              <li key={nav.id} className="nav-item">
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
