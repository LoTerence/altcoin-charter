import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./_store/reducers/authSlice";
import routes from "./routes";
import "./App.scss";

export default function App() {
  const dispatch = useDispatch();

  // TODO: extract user from token then authenticate
  const token = localStorage.getItem("token");

  // TODO: server should check if jwt token is legit before returning any user data
  if (token) {
    dispatch(authenticate());
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
