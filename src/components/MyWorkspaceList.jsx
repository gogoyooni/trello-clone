import React from "react";
import { getFirstLetter } from "../utils/workspace";

export default function MyWorkspaceList({ workspaceName }) {
  return (
    <li className="workspace-list your-workspace-list">
      <div className="workspace__first-letter">
        {getFirstLetter(workspaceName)}
        {/* {workspaceName.split("")[0]} */}
      </div>
      <div className="workspace__name">{workspaceName}</div>
    </li>
  );
}
