import React from "react";
import { Navigate, useMatch, useParams } from "react-router-dom";

import useUserStore from "../store";

export default function Protected({ children }) {
  // const { username } = useParams();
  const { username } = useParams();
  console.log("username: ", username);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUsername = useUserStore((state) => state.username);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
