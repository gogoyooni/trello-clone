import React, { useState } from "react";
// import
import UserSidebarWorkspaceList from "./UserSidebarWorkspaceList";

export default function UserSidebarWorkspaceWrapper({ workspaces }) {
  return (
    <ul className="user-sidebar__bottom-menu-wrapper">
      {workspaces &&
        workspaces?.map((workspace, i) => (
          <UserSidebarWorkspaceList key={i} workspace={workspace} />
        ))}
    </ul>
  );
}
