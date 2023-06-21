import React from "react";
import { AiOutlineCompass } from "react-icons/ai";
import {
  MdOutlineModeEditOutline,
  MdOutlinePersonAddAlt,
} from "react-icons/md";
import Input from "./Input";
import Container from "./Container";
import useWorkspaceStore from "../stores/workspaceStore";
import { getFirstLetter } from "../utils/workspace";

export default function UserWorkspaceHeader({ workspace, ...props }) {
  //   console.log("workspace inside UserWorkspaceHeader ;;;;", workspace);
  const { name } = workspace;
  const { inviteMembers } = { ...props };
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

  return (
    <>
      <div className="workspace-name__section">
        <div
          className={`workspace_name__wrapper  ${
            isWorkspaceInfoEdited ? "hide" : ""
          }`}
        >
          <div className="workspace_name__inner">
            <div className="workspace_name__uppercase">
              {/* {id.split("")[0].toUpperCase()} */}
              {/* {getFirstLetter(workspaceName)} */}
              {() => getFirstLetter(name)}
            </div>

            <div className="workspace_name__username">
              <div className="username-wrapper">
                <span>{name}</span>
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
        {inviteMembers === "true" ? (
          <div className="invitation-members__btn-wrapper">
            <button className="invitation-members__btn">
              <MdOutlinePersonAddAlt className="invitation-members__btn-icon" />
              <span>Invite Workspace members</span>
            </button>
          </div>
        ) : null}
      </div>

      {/* <div className="workspace-content__section">
      
        <header className="workspace-content__header">
       
          <div className="workspace-content__workspace-name-wrapper">
          <div className="workspace__first-letter"></div>
           
          </div>
        
        </header>
       Workspacename-_id - 임시 {workspaceName}

      </div> */}
      <hr />
    </>
  );
}
