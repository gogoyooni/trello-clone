import React from 'react'
import useBoardStore from '../stores/BoardStore'

const style = {
  remainingBoardsCount: {
    fontSize: "12px",
  },
  dropdownMenu: {
    width: "272px",
    // height: "300px",
    position: "absolute",
    top: "48px",
    left: "0px",
    // backgroundColor: "cyan",
    borderRadius: "3px",
    border: "0.5px solid rgba(0,0,0,0.24)",
    boxSizing: "border-box",
    // boxShadow: "inset 1px 2px 0px 0px rgba(0,0,0,0.24)",
  },
  dropdownOption: {
    // width: "100%",
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
  },
}

export default function SelectOptionItem({workspace, ...props}) {
  const setSelectedWorkspace = useBoardStore((state) => state.setSelectedWorkspace);
  const setWorkspaceId = useBoardStore((state) => state.setWorkspaceId);

  const {isDropped, setIsDropped} = props;
  return (
    // <div className="dropdown-menu__wrapper" style={style.dropdownMenu}>
        <div className="dropdown-option" style={style.dropdownOption} onClick={() => {
            setIsDropped(!isDropped);
            setSelectedWorkspace(workspace.name)
            setWorkspaceId(workspace._id)
          }}>
            <span>{workspace?.name}</span>
            <span
            className="remaining-boards-count"
            style={style.remainingBoardsCount}
            >
            {10 - workspace.boards.length} remaining
            </span>
        </div>
        // <div className="dropdown-option" style={style.dropdownOption}>
        //     <span>워크스페이스</span>
        //     <span
        //     className="remaining-boards-count"
        //     style={style.remainingBoardsCount}
        //     >
        //     7 boards remaining
        //     </span>
        // </div>
  // </div>
  )
}
