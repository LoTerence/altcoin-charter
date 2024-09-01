import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./_store/reducers/authSlice";
import routes from "./routes";
import "./scss/App.scss";
import * as bootstrap from "bootstrap";

export default function App() {
  console.log("Welcome to", import.meta.env.VITE_APP_TITLE);
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    dispatch(fetchUser());
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
