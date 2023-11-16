import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../lib/routes";
import { useAuth } from "../../lib/auth/AuthContext";

export const Navigation = () => {
  const auth = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <p className="text-xl font-bold tracking-tight text-white">
              Homeaglow
            </p>
          </div>
          <div className="flex items-baseline space-x-4">
            {!auth.isLoggedIn ? (
              <Link
                to={PATHS.login}
                className={classNames(
                  false
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
              >
                Login
              </Link>
            ) : null}

            {auth.isLoggedIn
              ? [
                  <Link
                    to={PATHS.list}
                    className={classNames(
                      false
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    Conversation List
                  </Link>,
                  <button
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    onClick={auth.onLogout}
                  >
                    Logout
                  </button>,
                ]
              : null}
          </div>
        </div>
      </div>
    </nav>
  );
};
