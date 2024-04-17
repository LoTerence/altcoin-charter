import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./_store/reducers/authSlice";
import routes from "./routes";
import "./scss/App.scss";

export default function App() {
  const dispatch = useDispatch();

  console.log("server url:", import.meta.env.VITE_APP_SERVER_URL);
  console.log("client url:", import.meta.env.VITE_APP_CLIENT_URL);

  if (localStorage.getItem("token")) {
    dispatch(fetchUser());
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
