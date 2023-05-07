import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "./Sidebar.css";

export default function Sidebar({ isSidebarFolded, setIsSidebarFolded }) {
  // const [isSidebarFolded, setIsSidebarFolded] = useState(false);

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
    // if (!isSidebarFolded) {
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
            <Link to="/">
              <div className="user-name-bg">
                <div className="user-name-first-letter">Y</div>
              </div>
            </Link>
            <div className="username">
              <Link to="/">
                <span>yooni</span>
              </Link>
            </div>
            <button className="fold-btn" onClick={controlSidebar}>
              <AiOutlineLeft />
            </button>
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
