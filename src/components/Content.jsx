import { useEffect } from "react";
import {
  Link,
  useLocation,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { FiStar } from "react-icons/fi";
import {
  MdOutlinePersonAddAlt,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { AiOutlineCompass } from "react-icons/ai";
import "./Content.css";

import useUserStore from "../store";
import useWorkspaceStore from "../stores/workspaceStore";

import Input from "./Input";
import Button from "./Button";
import Container from "./Container";

import useRefreshToken from "../hooks/useRefreshtoken";

export default function Content() {
  const { workspaces } = useOutletContext();
  // console.log("workspaces: ", workspaces);
  // console.log("데이터: ", 데이터);
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { username } = useParams();
  const isSignedup = useUserStore((state) => state.isSignedup);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const signupUsername = useUserStore((state) => state.signupUsername);
  // const username = useUserStore((state) => state.username);

  // console.log("isSignedup :", isSignedup, "isLoggedIn:", isLoggedIn);
  console.log("username : ", username);
  // const userId = location.state.userId;
  // console.log("userId: ", userId);
  const isWorkspaceInfoEdited = useWorkspaceStore(
    (state) => state.isWorkspaceInfoEdited
  );
  const setIsWorkspaceInfoEdited = useWorkspaceStore(
    (state) => state.setIsWorkspaceInfoEdited
  );

  const workspaceName = useWorkspaceStore((state) => state.workspaceName);

  const setWorkspaceName = useWorkspaceStore((state) => state.setWorkspaceName);

  const website = useWorkspaceStore((state) => state.website);
  const setWebsite = useWorkspaceStore((state) => state.setWebsite);

  const description = useWorkspaceStore((state) => state.description);
  const setDescription = useWorkspaceStore((state) => state.setDescription);

  // @update workspace -name, website, description
  const updateWorkspaceInfo = useWorkspaceStore(
    (state) => state.updateWorkspaceInfo
  );

  const updateInfo = () => {
    setIsWorkspaceInfoEdited();
    updateWorkspaceInfo({ name: workspaceName, website, description }, id);
  };

  // useEffect(() => {
  //   if (!username) {
  //     navigate("/");
  //   }
  // }, [username, navigate]);

  return (
    <div
      style={{
        display: "flex",
        padding: "32px",
        flex: "1",
        backgroundColor: "beige",
        flexDirection: "column",
        margin: "0 auto",
        maxWidth: "875px",
      }}
    >
      {/* <div> */}
      <div className="workspace-name__section">
        <div
          className={`workspace_name__wrapper  ${
            isWorkspaceInfoEdited ? "hide" : ""
          }`}
        >
          <div className="workspace_name__inner">
            <div className="workspace_name__uppercase">
              {/* {id.split("")[0].toUpperCase()} */}
              {workspaces[0]?.name.split("")[0]}
            </div>

            <div className="workspace_name__username">
              <div className="username-wrapper">
                <span>{workspaces?.length > 0 ? workspaces[0].name : ""}</span>
                <MdOutlineModeEditOutline
                  className="username-edit__icon"
                  onClick={setIsWorkspaceInfoEdited}
                />
                {/* <button onClick={() => refresh()}>Refresh</button> */}
              </div>
              <div className="website-wrapper">
                <AiOutlineCompass className="website-icon" />
                <a href="" target="_blank">
                  website
                </a>
              </div>
            </div>
            <div className="workspace-info__section">
              {/* <div className="website-info">
                <a href="" target="_blank">
                  webite
                </a>
              </div> */}
            </div>
          </div>
        </div>
        {isWorkspaceInfoEdited && (
          <div className="workspace-edit__section">
            <Input
              labelName="Name"
              required
              style={{ width: "250px", height: "36px" }}
              // name={name}
              setFunc={setWorkspaceName}
            />
            <Input
              labelName="Website (optional)"
              style={{ width: "250px", height: "36px" }}
              setFunc={setWebsite}
            />
            <Input
              labelName="Description (optional)"
              style={{ maxWidth: "250px", height: "71px" }}
              isTextArea
              setFunc={setDescription}
            />
            <Container>
              <Button
                btnType="primary"
                btnName="Save"
                // setFunc={updateAndToggle}
                // setFunc={setIsWorkspaceInfoEdited}
                setFunc={updateInfo}
              />
              <Button
                btnType="default"
                btnName="Cancel"
                setFunc={setIsWorkspaceInfoEdited}
              />
            </Container>
          </div>
        )}

        <div className="invitation-members__btn-wrapper">
          <button className="invitation-members__btn">
            <MdOutlinePersonAddAlt className="invitation-members__btn-icon" />
            <span>Invite Workspace members</span>
          </button>
        </div>
      </div>

      <div
        className="boards-section"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <p>{workspaceName}</p>
        <p>{website}</p>
        <p>{description}</p>
        <div
          className="select-menu"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="sort-by" style={{ marginBottom: "5px" }}>
            Sort by
          </label>
          <select name="sort-by" id="sort-by">
            <option value="mostRecentlyActive">Most Recently Active</option>
            <option value="leastRecentlyActive">Least Recently Active</option>
            <option value="alphabeticallyAtoZ">Alphabetically A-Z</option>
            <option value="alphabeticallyZtoA">Alphabetically Z-A</option>
          </select>
        </div>
        <div
          className="search"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* search boards input */}
          <label htmlFor="search" style={{ marginBottom: "5px" }}>
            Search
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search boards"
          />
        </div>
      </div>
      <div className="boards-list" style={{ marginTop: "20px" }}>
        <div className="boards-count" style={{ marginBottom: "20px" }}>
          <p>Showing 2 of 2 boards</p>
        </div>
        <ul
          style={{
            display: "flex",
            // gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <li
            style={{
              width: "33.3%",
              height: "80px",
              cursor: "pointer",
              backgroundColor: "grey",
              textAlign: "center",
              lineHeight: "80px",
              borderRadius: "5px",
              padding: "4px 8px",
            }}
          >
            Create new board
          </li>
          <li
            style={{
              width: "33.3%",
              height: "80px",
              cursor: "pointer",
              height: "80px",
              cursor: "pointer",
              backgroundColor: "aliceblue",
              // textAlign: "center",
              // lineHeight: "80px",
              borderRadius: "5px",
              padding: "4px 8px",
              display: "inline-block",
            }}
          >
            <Link to={"/b/1"}>
              <div
                className="board-item-inner"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    wordWrap: "break-word",
                    fontWeight: "700",
                    overflow: "hidden",
                  }}
                >
                  트렐로 보드 1
                </div>
                <div
                  className="board-favorite"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    zIndex: "2",
                  }}
                >
                  <FiStar
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
              </div>
            </Link>
          </li>
          <li
            style={{
              width: "33.3%",
              height: "80px",
              cursor: "pointer",
              height: "80px",
              cursor: "pointer",
              backgroundColor: "bisque",
              // textAlign: "center",
              // lineHeight: "80px",
              borderRadius: "5px",
              padding: "4px 8px",
            }}
          >
            <Link to={"/b/2"}>
              <div
                className="board-item-inner"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    wordWrap: "break-word",
                    fontWeight: "700",
                    overflow: "hidden",
                  }}
                >
                  트렐로 보드 2
                </div>
                <div
                  className="board-favorite"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <FiStar
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </div>
  );
}
