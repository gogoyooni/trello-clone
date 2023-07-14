import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdPersonOutline, MdSettings } from "react-icons/md";
import BoardList from "./BoardList";
import { getFirstLetter } from "../utils/workspace";

const style = {
  yourWorkspaceAllBoardsWrapper:{
    marginBottom: "15px"
  },
  yourWorkspacesHeader: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "20px 0",
  },
  yourWorkspacesNoSidebar: {
    display: "flex",
    alignItems: "center",
  },
  yourWorkspaceFirstletter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "aqua",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "3px",
    width: "32px",
    height: "32px",
    // marginBottom: 16px;
    overflow: "hidden",
    marginRight: "10px",
    color: "#fff",
  },
  yourWorkplaceName: {
    flex: "1",
    fontSize: "16px",
    fontWeight: "700",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  yourWorkplaceOptions: {
    display: "flex",
    gap: "0 10px",
  },
  boardMenuIcon: {
    marginRight: "5px",
  },
  yourWorkplaceOption: {
    display: "inline-block",
    borderRadius: "3px",
    backgroundColor: "#E1E3E7",
    display: "flex",
    alignItems: "center",
    padding: "6px 12px 6px 6px",
  },
};

export default function UserWorkspaceBoard({
  workspace,
  showRemainingBoards,
  workspaceIndex,
  userId,
  ...props
}) {
  // console.log("workspace>>>>>>>>>>>>>>>>>>>>>", workspace?.name);
  //   const content = (

  //   );
  return (
    <div className="your-workspace-all-boards__wrapper" style={style.yourWorkspaceAllBoardsWrapper}>
      <div
        className="your-worksplace-no-sidebar"
        style={style.yourWorkspacesNoSidebar}
      >
        <div
          className="your-workplace-first-letter"
          style={style.yourWorkspaceFirstletter}
        >
          {/* 난 */}
          {getFirstLetter(workspace?.name)}
        </div>
        <h3 className="your-workplace-name" style={style.yourWorkplaceName}>
          {/* 워크스페이스1 */}
          {workspace?.name}
        </h3>
        <div
          className="your-workplace-options"
          style={style.yourWorkplaceOptions}
        >
          <Link
            className="your-workplace-option"
            style={style.yourWorkplaceOption}
          >
            <MdDashboard
              className="board-menu-icon"
              style={style.boardMenuIcon}
            />
            <span>Boards</span>
          </Link>
          <Link
            className="your-workplace-option"
            style={style.yourWorkplaceOption}
          >
            <MdPersonOutline
              className="board-menu-icon"
              style={style.boardMenuIcon}
            />
            <span>Members</span>
          </Link>
          <Link
            className="your-workplace-option"
            style={style.yourWorkplaceOption}
          >
            <MdSettings
              className="board-menu-icon"
              style={style.boardMenuIcon}
            />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      <BoardList  
        userId={userId}
        workspaceId={workspace?._id}
        workspaceName={workspace?.name}
        boards={workspace?.boards}
        showRemainingBoards={showRemainingBoards}
        {...props}
      />      
    </div>
  );
}
