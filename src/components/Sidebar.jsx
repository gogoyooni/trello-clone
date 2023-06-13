import React, { useRef, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdDashboard, MdOutlinePersonOutline } from "react-icons/md";
import "./Sidebar.css";
import useUserStore from "../store";

export default function Sidebar({
  isSidebarFolded,
  setIsSidebarFolded,
  workspaces,
}) {
  // const [isSidebarFolded, setIsSidebarFolded] = useState(false);

  const { id } = useParams();

  const sideBarRef = useRef();
  const subbarRef = useRef();

  const controlSubbar = () => {
    // 왼쪽 사이드 메뉴가 접혀서 들어가있을때
    if (isSidebarFolded)
      //   subbarRef.current.style.transform = "translateX(-45px)";
      // sideBarRef.current.style.transform = "translateX(0px)";
      setIsSidebarFolded((prevState) => {
        return !prevState;
      });
  };

  const controlSidebar = () => {
    console.log("클릭이 된다.");
    // 왼쪽 사이드메뉴바가 튀어나와있는 상태일때
    // if (!isSidebarFolded) {  const username = useUserStore((state) => state.username);

    //   // sideBarRef.current.style.transform = "translateX(-260px)";
    //   // subbarRef.current.style.transform = "translateX(45px)";
    //   setIsSidebarFolded((prevState) => {
    //     return !prevState;
    //   });
    // } else if (isSidebarFolded) {
    //   // sideBarRef.current.style.transform = "translateX(0px)";
    //   // subbarRef.current.style.transform = "translateX(-45px)";
    //   setIsSidebarFolded((prevState) => {
    //     return !prevState;
    //   });
    // }
    setIsSidebarFolded((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <nav
        className={
          !isSidebarFolded
            ? "sidebar sidebar-unfolded"
            : "sidebar sidebar-folded"
        }
        // ref={sideBarRef}
      >
        <div className="sidebar-inner">
          <div className="sidebar-user-section">
            <Link to={`/w/${id}`}>
              <div className="user-name-bg">
                <div className="user-name-first-letter">
                  {/* {id.split("")[0].toUpperCase()} */}
                  {workspaces ? workspaces[0].name.split("")[0] : ""}
                </div>
              </div>
            </Link>
            <div className="username">
              <Link to={`/w/${id}`}>
                {/* <span>{id}</span> */}
                {/* <span>{workspaces[0].name}</span> */}
                <span>{workspaces ? workspaces[0].name : ""}</span>
                {/* <span>{JSON.stringify(workspaces)}</span> */}
              </Link>
            </div>
            <button className="fold-btn" onClick={controlSidebar}>
              <AiOutlineLeft />
            </button>
          </div>
          <div className="links">
            <ul className="board__link-list">
              <li className="link">
                <NavLink
                  to={`/w/${id}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  end
                >
                  <MdDashboard className="link-icon" />
                  <span className="link-name">Boards</span>
                </NavLink>
              </li>
              <li className="link">
                <NavLink
                  to={`/w/${id}/members`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  end
                >
                  <MdOutlinePersonOutline className="link-icon" />
                  <span className="link-name">Members</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={
          !isSidebarFolded ? "subbar subbar-folded" : "subbar subbar-unfolded"
        }
        // ref={subbarRef}
      >
        <div style={{ position: "relative" }}>
          <button className="subbar-btn" onClick={controlSubbar}>
            {/* 오른쪽 */}
            <AiOutlineRight />
          </button>
        </div>
      </div>
    </>
  );
}
