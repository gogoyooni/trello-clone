import React from "react";
import { Navigate, useMatch, useParams } from "react-router-dom";

import useUserStore from "../store";

export default function Protected({ children }) {
  // const { username } = useParams();
  // const { username } = useParams();

  // const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isLoggedIn = JSON.parse(localStorage.getItem("user")).isLoggedIn;
  // console.log("isLoggedIn", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
