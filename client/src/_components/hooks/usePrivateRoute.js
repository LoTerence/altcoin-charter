import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../_store/reducers/authSlice";

const usePrivateRoute = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default usePrivateRoute;
