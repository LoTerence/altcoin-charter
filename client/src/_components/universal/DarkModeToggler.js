import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, setIsDark } from "../../_store/reducers/darkModeSlice";
import { CircleHalfIcon, DarkIcon, LightIcon } from "../icons";

const DarkModeToggler = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector(selectDarkMode);

  const setDarkTheme = () => {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    localStorage.theme = "dark";
    dispatch(setIsDark(true));
  };

  const setLightTheme = () => {
    document.documentElement.removeAttribute("data-bs-theme");
    localStorage.theme = "light";
    dispatch(setIsDark(false));
  };

  const setSystemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      dispatch(setIsDark(true));
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
      dispatch(setIsDark(false));
    }
    localStorage.removeItem("theme");
  };

  return (
    <li className="nav-item dropdown">
      <button
        aria-haspopup="true"
        aria-expanded="false"
        className="nav-link dropdown-toggle d-flex align-items-center"
        data-toggle="dropdown"
        id="bd-theme"
        type="button"
      >
        {isDark ? <DarkIcon /> : <LightIcon />}{" "}
        <div className="d-md-none ms-2">Toggle theme</div>
      </button>
      <ul
        aria-labelledby="navbarDropdown"
        className="dropdown-menu dropdown-menu-end min-w-fit"
        data-bs-popper="static"
      >
        <li>
          <button
            className="dropdown-item d-flex align-items-center w-auto"
            onClick={() => {
              setLightTheme();
            }}
          >
            <LightIcon className="me-2 opacity-50" />
            Light
          </button>
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center w-auto"
            onClick={() => {
              setDarkTheme();
            }}
          >
            <DarkIcon className="me-2 opacity-50" />
            Dark
          </button>
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center w-auto"
            onClick={() => {
              setSystemTheme();
            }}
          >
            <CircleHalfIcon className="me-2 opacity-50" />
            Auto
          </button>
        </li>
      </ul>
    </li>
  );
};

export default DarkModeToggler;
