import React from "react";
import App from "../App";

import { Conversation } from "../screens/Conversation";
import { ConversationList } from "../screens/ConversationList";
import { Login } from "../screens/Login";
import { RequireAuth } from "./auth/RequireAuth";
import { Home } from "../screens/Home";

export const PATHS = {
  login: "/login",
  list: "/app/list",
  conversation: "/app/conversation",
};

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "app",
        element: <RequireAuth />,
        children: [
          {
            path: "list",
            element: <ConversationList />,
          },
          {
            path: "conversation/:conversationId",
            element: <Conversation />,
          },
        ],
      },
    ],
  },
];
