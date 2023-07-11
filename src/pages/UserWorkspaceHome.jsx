import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useParams, useLocation } from "react-router-dom";
// import workspaceService from "../features/workspace/workspaceService";
import useUserStore from "../store";
import UserWorkspaceHeader from "../components/UserWorkspaceHeader";
import Loading from "../components/Loading";
import "./styles/UserWorkspaceHome.css";

function UserWorkspaceHome() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [workspace, setWorkspace] = useState([]);
  const [loading, startTransition] = useTransition();
  const { workspaceId } = useParams();
  console.log("workspaceId", workspaceId);
  const _getWorkspace = useUserStore((state) => state.getWorkspace);

  const fetchSingleWorkspace = async () => {
    setIsLoading(true);
    const {
      data: { workspace }, // destructuring from data
    } = await _getWorkspace(workspaceId);
    setWorkspace(workspace);
    // startTransition(() => {});

    setIsLoading(false);
  };

  useLayoutEffect(() => {
    fetchSingleWorkspace();
    console.log("Location changed!", location.pathname);
  }, [location]);
  return (
    <div className="user-workspace-home__boards-wrapper">
      {isLoading ? (
        <div className="loading-spinner__wrapper">
          <Loading />
        </div>
      ) : (
        <>
          <UserWorkspaceHeader workspace={workspace} inviteMembers="false" />
          <h3>/w/{workspaceId}/home</h3>
        </>
      )}

      {/* <UserWorkspaceHeader workspace={workspace} /> */}
    </div>
  );
}

export default UserWorkspaceHome;
