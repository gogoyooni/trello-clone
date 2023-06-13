import React from "react";
import MyWorkspaceList from "./MyWorkspaceList";

export default function MyWorkspaces({ workspaces }) {
  return (
    <ul>
      <h3 className="workspace__header your-workspaces">Your Workspaces</h3>
      {workspaces?.map((workspace, i) => (
        <MyWorkspaceList key={i} workspaceName={workspace.name} />
      ))}
      {/* <li className="workspace-list your-workspace-list">
        <div className="workspace__first-letter">T</div>
        <div className="workspace__name">TestWorkSpace</div>
      </li>
      <li className="workspace-list your-workspace-list">
        <div className="workspace__first-letter">워</div>
        <div className="workspace__name">워크스페이스</div>
      </li> */}
    </ul>
  );
}
