import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { PATHS } from "../routes";
import { Loading } from "../../components/Loading";

export const RequireAuth = () => {
  let auth = useAuth();
  let location = useLocation();

  if (auth.loading) {
    return <Loading />;
  }

  if (!auth.isLoggedIn) {
    return <Navigate to={PATHS.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
