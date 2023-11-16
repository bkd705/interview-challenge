import React from "react";
import { useAuth } from "../lib/auth/AuthContext";
import { Navigate } from "react-router-dom";
import { PATHS } from "../lib/routes";

export const Home = () => {
  const auth = useAuth();

  if (auth.checkAuthStatus()) {
    return <Navigate to={PATHS.list} />;
  } else {
    return <Navigate to={PATHS.login} />;
  }
};
