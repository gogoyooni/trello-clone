import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import workspaceService from "../features/workspace/workspaceService";
import useUserStore from "../store";
import UserWorkspaceHeader from "../components/UserWorkspaceHeader";
import Loading from "../components/Loading";
import "./styles/UserWorkspaceHome.css";

function UserWorkspaceHome() {
  const [isLoading, setIsLoading] = useState(false);

  const [workspace, setWorkspace] = useState([]);
  const { workspaceId } = useParams();
  console.log("workspaceId", workspaceId);
  const _getWorkspace = useUserStore((state) => state.getWorkspace);

  const fetchSingleWorkspace = async () => {
    setIsLoading(true);
    const {
      data: { workspace }, // destructuring from data
    } = await _getWorkspace(workspaceId);
    setWorkspace(workspace);
    setIsLoading(false);
  };

  console.log("data - UserworkspaceHome", workspace);
  // console.log("isLoading", isLoading);
  // console.log("isLoading", isLoading);
  useEffect(() => {
    fetchSingleWorkspace();
  }, []);
  return (
    <div className="user-workspace-home__boards-wrapper">
      {isLoading ? (
        <Loading />
      ) : (
        <UserWorkspaceHeader workspace={workspace} inviteMembers="false" />
      )}
      <h3>/w/{workspaceId}/home</h3>
      {/* <UserWorkspaceHeader workspace={workspace} /> */}
    </div>
  );
}

export default UserWorkspaceHome;
