import React from "react";
import { BsPlusLg } from "react-icons/bs";

export default function UserSidebarWorkspaceHeader({ toggleModal }) {
  return (
    <div className="user-sidebar__workspaces-header">
      <div className="user-sidebar__workspaces-header-name">Workspaces</div>
      <BsPlusLg
        className="workplace-add-icon"
        onClick={() => toggleModal(true)}
      />
    </div>
  );
}
