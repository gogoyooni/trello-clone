import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, redirect } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./styles/Layout.css";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Board from "./Board";
import useUserStore from "../store";
import workspaceService from "../features/workspace/workspaceService";
import NavDropdown from "../components/NavDropdown";
import WorkspaceList from "../components/MyWorkspaces";

export default function Layout() {
  const [isSidebarFolded, setIsSidebarFolded] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isWorkspaceDropdownShown, setIsWorkspaceDropdownShown] =
    useState(false);
  // const [workspaceNameIsEdited, setWorkspaceNameIsEdited] = useState(false);
  // const [workspaceInfo, setWorkspaceInfo] = useState({
  //   name: "", // required
  //   website: "", // optional
  //   description: "", //optional
  // });
  // redirect("/login");
  // console.log("username from store", username);

  const editWorkspaceName = () => {};

  const id = useUserStore((state) => state._id);
  const token = useUserStore((state) => state.accessToken);
  const logout = useUserStore((state) => state.logout);

  const fetchWorkspace = async () => {
    setIsLoading(true);
    try {
      const { data } = await workspaceService._getWorkspace(
        `/api/user/${id}/workspace`,
        { id },
        token
      );
      setIsLoading(false);
      setWorkspaces(data.workspaces);
    } catch (e) {
      setIsLoading(false);
      // throw new Error(e);
      return <div>Something wrong</div>;
    }
  };
  useEffect(() => {
    fetchWorkspace();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className="main-navigation__wrapper">
        <ul className="main-navigation">
          {/* <li>
            <Link to="/" onClick={logout}>
              Home
            </Link>
          </li> */}
          <li className="main-navigation__menu-wrapper">
            <div
              className="main-menu workspaces__menu"
              onClick={() =>
                setIsWorkspaceDropdownShown(!isWorkspaceDropdownShown)
              }
            >
              <span>Workspaces</span>
              <MdOutlineKeyboardArrowDown className="main-navigation__arrow-down" />
            </div>
            <NavDropdown
              menuName={"Workspaces"}
              isOpen={isWorkspaceDropdownShown}
              onClickOutside={(e) => setIsWorkspaceDropdownShown(false)}
            >
              <h3 className="workspace__header current-workspace">
                Current Workspace
              </h3>
              <li className="workspace-list">
                <div className="workspace__first-letter">난</div>
                <div className="workspace__name">난경제적으로풍요롭다</div>
              </li>
              <div className="workspace__line"></div>
              {workspaces && <WorkspaceList workspaces={workspaces} />}
            </NavDropdown>
          </li>
          <li className="main-navigation__menu-wrapper">
            <div className="main-menu recent__menu">
              <span>Recent</span>
              <MdOutlineKeyboardArrowDown className="main-navigation__arrow-down" />
            </div>
            <NavDropdown menuName={"Recent"}>
              <ul className="dropdown__recent">
                <li className="workspace-list"></li>
              </ul>
            </NavDropdown>
          </li>
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
          workspaces={workspaces.length > 0 && workspaces}
          // isWorkspaceInfoEdited={isWorkspaceInfoEdited}
          // setIsWorkspaceInfoEdited={setIsWorkspaceInfoEdited}
          // setWorkspaceName={setWorkspaceName}
          // setWebsite={setWebsite}
          // setDescription={setDescription}
        />
        {/* <Content isSidebarFolded={isSidebarFolded} /> */}
        <Outlet context={{ workspaces }} />
        {/* <Outlet /> */}
        {/* {workspaces?.length > 0 && (
         <Outlet context={{ workspaces: workspaces }} />
       )} */}
      </div>
    </div>
  );
}
