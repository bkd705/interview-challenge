import React, { FormEvent, useEffect, useState } from "react";
import { AuthClient } from "../clients/AuthClient";
import { useAuth } from "../lib/auth/AuthContext";
import { Navigate, redirect } from "react-router-dom";
import { PATHS } from "../lib/routes";
import { PageLayout } from "../components/layout/PageLayout";
import { Label } from "../components/forms/Label";
import { Input } from "../components/forms/Input";

const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();

  const login = async (e: FormEvent) => {
    e.preventDefault();

    // Reset error if this is a retry and there was an error before
    if (error) {
      setError(null);
    }

    try {
      setLoading(true);
      const response = await AuthClient.login(username, password);

      const { access, refresh } = response;
      auth.onLogin(access, refresh);
    } catch (err) {
      setError("An error has occured, please try again");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
  };
};

export const Login = () => {
  const { login, username, setUsername, password, setPassword } = useLogin();

  const auth = useAuth();

  if (auth.isLoggedIn) {
    return <Navigate to={PATHS.list} />;
  }

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <PageLayout title="Login">
      <form onSubmit={login}>
        <Label htmlFor="username">
          Username
          <Input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={onUsernameChange}
            placeholder="Username"
          />
        </Label>
        <div className="mt-4">
          <Label htmlFor="password">
            Password
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Password"
            />
          </Label>
        </div>

        <div className="mt-4">
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </PageLayout>
  );
};
