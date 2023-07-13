import { useCallback, useEffect, useState, memo } from "react";
import { Link, Outlet, redirect, useMatch } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./styles/Layout.css";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Board from "./Board";
import useUserStore from "../store";
import workspaceService from "../features/workspace/workspaceService";
import NavDropdown from "../components/NavDropdown";
import WorkspaceList from "../components/MyWorkspaces";
import UserSidebar from "../components/UserSidebar";
import { getFirstLetter } from "../utils/workspace";
import Modal from "../components/Modal";

function Layout() {
  const isBoard = useMatch("/u/:username/boards");
  const isWorkspace = useMatch("/w/:workspaceId/home");
  const isSpecificBoard = useMatch("/b/:boardId/:boardName");

  // console.log("isWorkspace: ", isWorkspace?.pattern.path);
  // console.log("isBoard:", isBoard?.pattern.path);
  // console.log("isSpecificBoard :", isSpecificBoard?.pattern.path);
  const [isSidebarFolded, setIsSidebarFolded] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentWorkplace, setCurrentWorkplace] = useState("");

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
  // console.log("currentworkplace :::", currentWorkplace);

  // console.log("isWorkspace:", isWorkspace);

  const id = useUserStore((state) => state._id);
  const token = useUserStore((state) => state.accessToken);
  const logout = useUserStore((state) => state.logout);

  const fetchWorkspaces = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await workspaceService._getWorkspaces(
        `/api/user/${id}/workspaces`,
        {},
        token
      );
      setIsLoading(false);
      setWorkspaces(data.workspaces);
    } catch (e) {
      setIsLoading(false);
      // throw new Error(e);
      return <div>Something wrong</div>;
    }
    console.log("workspaces of fetchWorkspaces --", workspaces);
  }, []);
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  console.log("workspaces inside Layout ---", workspaces);
  return (
    <div className="main-content__wrapper">
      {isModalVisible ? <Modal closeModal={setIsModalVisible} /> : null}
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
              {isWorkspace || isSpecificBoard ? (
                <>
                  <h3 className="workspace__header current-workspace">
                    Current Workspace
                  </h3>
                  <li className="workspace-list">
                    <div className="workspace__first-letter">
                      {/* {workspaces.length == 1 && getFirstLetter(workspaces[0].name)} */}
                      {getFirstLetter(currentWorkplace)}
                    </div>
                    <div className="workspace__name">
                      {/* {workspaces.length == 1 && workspaces[0].name} */}
                      {currentWorkplace !== "" ? currentWorkplace : "뭐야"}
                    </div>
                  </li>
                  <div className="workspace__line"></div>
                </>
              ) : null}
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
        className={`main-content ${(isBoard || isWorkspace) && "dashboard"}`}
      >
        {/* {isBoard?.pattern.path === "/u/:username/boards" && (
          <UserSidebar workspaces={workspaces.length > 0 && workspaces} />
        )}
        {isWorkspace?.pattern.path === "/w/:workspaceName/home" && (
          <UserSidebar workspaces={workspaces.length > 0 && workspaces} />
        )} */}

        {isBoard?.pattern.path || isWorkspace?.pattern.path ? (
          <UserSidebar
            workspaces={workspaces?.length > 0 && workspaces}
            toggleModal={setIsModalVisible}
            setCurrentWorkplace={setCurrentWorkplace && setCurrentWorkplace}
          />
        ) : (
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
        )}

        {/* <Content isSidebarFolded={isSidebarFolded} /> */}
        {/* <Outlet context={{ workspaces }} /> */}
        <Outlet context={[workspaces, setWorkspaces]} />
        {/* <Outlet /> */}
        {/* {workspaces?.length > 0 && (
         <Outlet context={{ workspaces: workspaces }} />
       )} */}
      </div>
    </div>
  );
}

export default memo(Layout);
