import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { getFirstLetter } from "../utils/workspace";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

import useUserStore from "../store";

export default function UserSidebarWorkspaceList({ workspace }) {
  const [isClicked, setIsClicked] = useState(false);
  const { _id } = workspace; // workspace id
  // console.log("workspace:::", workspace);
  // const username = useUserStore((state) => state._id);

  console.log("isClicked", isClicked);
  return (
    <li className="user-sidebar__workspace">
      <div
        className="user-sidebar__workspace-item"
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="user-sidebar__workspace-menu">
          <div className="user-sidebar__workspace-menu-wrapper">
            <div className="user-sidebar__workspace__first-letter">
              {getFirstLetter(workspace.name)}
            </div>
            <div className="user-sidebar__workspace__name">
              {workspace.name}
            </div>
            {isClicked ? (
              <MdKeyboardArrowUp className="user-sidebar__workspace-arrow-icon" />
            ) : (
              <MdKeyboardArrowDown className="user-sidebar__workspace-arrow-icon" />
            )}
          </div>
        </div>
      </div>
      {isClicked ? (
        <ul className="user-sidebar__workspace-sub-wrapper">
          <li className="user-sidebar__workspace__sub-menu">
            <NavLink
              // className="user-sidebar__workspace__sub-menu-wrapper"
              className={({ isActive }) =>
                isActive
                  ? "user-sidebar__workspace__sub-menu-wrapper sub-menu_active"
                  : "user-sidebar__workspace__sub-menu-wrapper"
              }
              to={`/w/${_id}/home`}
            >
              <MdDashboard className="user-sidebar__workspace__sub-menu-icon" />
              <span className="user-sidebar__workspace__sub-menu-name">
                Boards
              </span>
            </NavLink>
          </li>
        </ul>
      ) : null}
    </li>
  );
}
