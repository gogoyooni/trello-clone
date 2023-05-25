import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Board from "./Board";

export default function Layout() {
  const [isSidebarFolded, setIsSidebarFolded] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{/* <Link to="/about">About</Link> */}</li>
        </ul>
      </nav>

      {/* <hr /> */}

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          // flex: "1"
        }}
      >
        <Sidebar
          isSidebarFolded={isSidebarFolded}
          setIsSidebarFolded={setIsSidebarFolded}
        />
        {/* <Content isSidebarFolded={isSidebarFolded} /> */}
        <Outlet />
      </div>
    </div>
  );
}
