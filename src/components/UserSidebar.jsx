import React, { useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  MdDashboard,
  MdOutlinePersonOutline,
  MdKeyboardArrowDown,
} from "react-icons/md";
import UserSidebarWorkspaceHeader from "./UserSidebarWorkspaceHeader";

import "./UserSidebar.css";
import UserSidebarWorkspaceWrapper from "./UserSidebarWorkspaceWrapper";
import useUserStore from "../store";

// UserSidebar가 유저가 로그인 후에 보이는 /u/:username/boards에 쓰이는 사이드바
//UserSidebar와 그냥 Sidebar를 조건부로 렌더링 필요
export default function UserSidebar({ workspaces, toggleModal }) {
  const { username } = useParams();
  const globalUsername = useUserStore((state) => state.username);

  const navigate = useNavigate();
  return (
    <div className="user-sidebar__container">
      {/* UserSidebar <h2>유저사이드바</h2> */}
      <ul className="user-sidebar__top-menu-wrapper">
        <li className="user-sidebar__top-menu">
          {/* <Link
            className="user-sidebar__menu-wrapper"
            to={`/u/${username}/boards`}
          >
            <MdDashboard className="user-sidebar__board-icon" />
            <span>Boards</span>
          </Link> */}
          <NavLink
            //   "user-sidebar__menu-wrapper"
            className={({ isActive, isPending }) =>
              isActive
                ? "user-sidebar__top-menu-link active-menu"
                : "user-sidebar__top-menu-link"
            }
            // to={`/u/${username}/boards`}
            to={`/u/${username ? username : globalUsername}/boards`}
            // onClick={() => navigate(0)}
          >
            <MdDashboard className="user-sidebar__board-icon" />
            <span>Boards</span>
          </NavLink>
        </li>
      </ul>
      <ul className="user-sidebar__bottom-menu-wrapper">
        {/* <div className="user-sidebar__workspaces-section"> */}
        <UserSidebarWorkspaceHeader toggleModal={toggleModal} />
        {/* <div className="user-sidebar__workspaces-header">
          <div className="user-sidebar__workspaces-header-name">Workspaces</div>
          <BsPlusLg className="workplace-add-icon" />
        </div> */}
        <UserSidebarWorkspaceWrapper
          workspaces={workspaces.length > 0 && workspaces}
        />
        {/* <li className="user-sidebar__workspace">
            <div className="user-sidebar__workspace-item">
              <div className="user-sidebar__workspace-menu">
                <div className="user-sidebar__workspace-menu-wrapper">
                  <div className="user-sidebar__workspace__first-letter">
                    난
                  </div>
                  <div className="user-sidebar__workspace__name">
                    난경제적으로풍요롭다
                  </div>
                  <MdKeyboardArrowDown className="user-sidebar__workspace-arrow-icon" />
                </div>
              </div>
            </div>
            <ul className="user-sidebar__workspace-sub-wrapper">
              <li className="user-sidebar__workspace__sub-menu">
                <Link className="user-sidebar__workspace__sub-menu-wrapper">
                  <MdDashboard className="user-sidebar__workspace__sub-menu-icon" />
                  <span className="user-sidebar__workspace__sub-menu-name">
                    Boards
                  </span>
                </Link>
              </li>
            </ul>
          </li> */}

        {/* <ul className="user-sidebar__workspaces-wrapper">
          <li className="user-sidebar__workspace">
            <div className="user-sidebar__workspace-item">
              <div className="user-sidebar__workspace-menu">
                <div className="user-sidebar__workspace-menu-wrapper">
                  <div className="user-sidebar__workspace__first-letter">
                    난
                  </div>
                  <div className="user-sidebar__workspace__name">
                    난경제적으로풍요롭다
                  </div>
                  <MdKeyboardArrowDown className="user-sidebar__workspace-arrow-icon" />
                </div>
              </div>
            </div>
            <ul className="user-sidebar__workspace-sub-wrapper">
              <li className="user-sidebar__workspace__sub-menu">
                <Link className="user-sidebar__workspace__sub-menu-wrapper">
                  <MdDashboard className="user-sidebar__workspace__sub-menu-icon" />
                  <span className="user-sidebar__workspace__sub-menu-name">
                    Boards
                  </span>
                </Link>
              </li>
            </ul>
          </li>
        </ul> */}
        {/* </div> */}
      </ul>
    </div>
  );
}
