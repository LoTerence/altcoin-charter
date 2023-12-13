import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../_store/reducers/authSlice";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector(selectAuth);

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}
