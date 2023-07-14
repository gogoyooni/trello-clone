import React from "react";
import UserWorkspaceBoard from "./UserWorkspaceBoard";

const style = {
  yourWorkspacesHeader: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "20px 0",
  },

};

export default function UserWorkspacesBoards({
  data,
  showRemainingBoards,
  userId,
  ...props
}) {
  //   const content =
  //     data?.length > 0 &&
  console.log("data:::", data);
  return (
    <div className="your-all-workspaces-boards__wrapper">
      <h3 className="your-workspaces-header" style={style.yourWorkspacesHeader}>
        Your Workspaces
      </h3>
      <div className="your-workspaces-boards__wrapper" >
        {/* <div className="your-workspace-all-boards__wrapper">
            
        </div> */}
        {data?.length > 0 &&
          data?.map((workspace, i) => (
            <UserWorkspaceBoard
              key={i}
              userId={userId}
              workspace={workspace}
              showRemainingBoards={showRemainingBoards}
              {...props}
            />
          ))}
      </div>
    </div>
  );
}
