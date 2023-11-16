import React, { createContext, useEffect, useState } from "react";
import { WithChildren } from "../react-helpers";
import {
  tokensCheck,
  initAuth,
  handleTokens,
  clearTokens,
  getTokens,
} from "./auth";
import { AuthClient } from "../../clients/AuthClient";
import { UserInfo } from "../../types/Auth";

interface AuthContext {
  loading: boolean;
  isLoggedIn: boolean;
  userinfo: UserInfo | null;
  checkAuthStatus: () => boolean;
  onLogin: (access: string, refresh: string) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  loading: true,
  isLoggedIn: false,
  userinfo: null,
  checkAuthStatus: () => false,
  onLogin: () => {},
  onLogout: () => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

interface AuthContextProviderProps extends WithChildren {}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userinfo, setUserinfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshToken = async () => {
    try {
      const { refresh } = getTokens();
      if (refresh === null) {
        onLogout();
        return;
      }

      const response = await AuthClient.refreshToken(refresh);
      handleTokens(response.access, refresh);
      getUserInfo();
    } catch (err) {
      onLogout();
    }
  };

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const response = await AuthClient.userinfo();
      setUserinfo(response);
      setLoading(false);
    } catch (err: any) {
      console.log("An error occurred while fetching user info");
      console.log(err);

      const { response } = err;
      if (response.status === 401) {
        refreshToken();
      }
    }
  };

  // Setup authorization on the initial page load
  // Checks for tokens, if they exist sets logged in to true, runs logic required on initial load
  // and fetches the currently logged in users information
  useEffect(() => {
    const hasTokensSet = tokensCheck();
    if (hasTokensSet) {
      setIsLoggedIn(true);
      initAuth();

      getUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  const onLogin = (access: string, refresh: string) => {
    setIsLoggedIn(true);
    handleTokens(access, refresh);
    getUserInfo();
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUserinfo(null);
    clearTokens();
  };

  const checkAuthStatus = () => {
    return isLoggedIn || tokensCheck();
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn,
        checkAuthStatus,
        userinfo,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
