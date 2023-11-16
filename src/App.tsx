import React from "react";
import { WithChildren } from "./lib/react-helpers";
import { AuthContextProvider } from "./lib/auth/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";

interface AppProps extends WithChildren {}

const App = ({ children }: AppProps) => {
  return (
    <div className="min-h-full">
      <AuthContextProvider>
        <Navigation />
        <Outlet />
      </AuthContextProvider>
    </div>
  );
};

export default App;
