import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserWorkspaceHeader from "../components/UserWorkspaceHeader";
import "./styles/UserBoards.css";

export default function UserBoards() {
  const { username } = useParams();

  useEffect(() => {}, []);
  return (
    <div className="user-workspace-content__section">
      <header className="workspace-content__header">
        <div className=""></div>
      </header>
      u/{username}/boards
    </div>
  );
}
