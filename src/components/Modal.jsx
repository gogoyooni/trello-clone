import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import workspaceService from "../features/workspace/workspaceService";
import useUserStore from "../store";
import "./Modal.css";

export default function Modal({ closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(""); // required data
  const [workspaceDesc, setWorkspaceDesc] = useState(""); // optional data

  const id = useUserStore((state) => state._id);
  const token = useUserStore((state) => state.accessToken);

  const onChangeWorkspaceName = (e) => {
    setWorkspaceName(e.target.value);
  };

  const onChangeWorkspaceDesc = (e) => {
    setWorkspaceDesc(e.target.value);
  };

  const createWorkspace = async (e, token) => {
    e.preventDefault();
    setIsLoading(true);
    await workspaceService._createWorkspace(
      `/api/user/${id}/workspace`,
      {
        workspaceName: workspaceName,
        workspaceDescription: workspaceDesc,
      },
      token
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  console.log("workspaceName:", workspaceName);
  console.log("workspaceDesc:", workspaceDesc);
  return (
    <div className="modal__bg">
      <div className="modal__container">
        <div className="modal-close__btn">
          <MdClose
            className="modal-close-btn__icon"
            onClick={() => closeModal(false)}
          />
        </div>
        <div className="modal-left__wrapper">
          <div className="modal-title">
            <span>Let's build a Workspace</span>
          </div>
          <div className="modal-subtitle">
            <span>
              Boost your productivity by making it easier for everyone to access
              boards in one location.
            </span>
          </div>
          <form
            className="modal-form__container"
            onSubmit={(e) => createWorkspace(e, token)}
          >
            <div className="workspace-name-input__wrapper">
              <label className="workspace-label">Workspace name</label>
              <input
                className="workspace-input"
                type="text"
                onChange={onChangeWorkspaceName}
              />
              <span className="workspace-name__tip">
                This is the name of your company, team or organization.
              </span>
            </div>
            <div className="workspace-desc-textarea__wrapper">
              <label className="workspace-label">
                Workspace description <span>Optional</span>
              </label>
              <textarea
                className="workspace-input"
                type="text"
                onChange={onChangeWorkspaceDesc}
              ></textarea>
              <span className="workspace-desc__tip">
                Get your members on board with a few words about your Workspace.
              </span>
            </div>
            <div className="workspace-submit-btn__wrapper">
              <button
                className={`workspace-submit-btn ${
                  workspaceName.length > 0 && "available"
                } ${isLoading ? "sending" : ""}`}
                // onClick={() => createWorkspace(token)}
              >
                {isLoading ? (
                  <PulseLoader color="#bcbdbd" />
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="modal-right__wrapper">
          <div className="modal-right__bg"></div>
        </div>
      </div>
    </div>
  );
}
