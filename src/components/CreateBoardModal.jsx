import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import "./CreateBoardModal.css";
import SelectMenu from "./SelectMenu";
import "./SelectMenu.css";
import BackgroundSelect from "./BackgroundSelect";
import useBoardStore from "../stores/BoardStore";
import FlexContainer from "./FlexContainer";
import Loading from "./Loading";
import useUserStore from "../store";

import { toast } from "react-toastify";

const style = {
  // wrapper: {
  //   display: "flex",
  //   flexDirection: "column",
  //   // justifyContent: "center",
  //   // textAlign: "center",
  //   width: "304px",
  //   maxWidth: "304px",
  //   position: "relative",
  //   // padding: "4px 8px",
  //   padding: "12px",
  //   overflow: "auto",
  //   backgroundColor: "#fff",
  //   borderRadius: "3px",
  //   overflowY: "auto",
  //   overflowX: "hidden",
  //   boxShadow: "0px 8px 12px #091e4226, 0px 0px 1px #091e424f",
  // },
  header: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    color: "#44546F",
    // padding: "0 32px",
    // textAlign: "center",
    // justifyContent: "center",
  },
  modalTitle: {
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "center",
    flex: "1",
  },

  option: {
    display: "flex",
    minHeight: "36px",
    // justifyContent: "center",
    alignItems: "center",
    boxShadow: "inset 0 0 0 2px #DADDE2",
    borderRadius: "3px",
    width: "100%",
    padding: "8px 12px",
    boxSizing: "border-box",
    cursor: "pointer",
    // flexDirection: "column",
  },
  arrowDownIcon: {
    width: "20px",
    height: "auto",
    fontWeight: "bold",
  },
  defaultValue: {
    flex: "1",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  dropdownMenu: {
    width: "272px",
    // height: "300px",
    position: "absolute",
    top: "48px",
    left: "0px",
    // backgroundColor: "cyan",
    borderRadius: "3px",
    border: "0.5px solid rgba(0,0,0,0.24)",
    boxSizing: "border-box",
    // boxShadow: "inset 1px 2px 0px 0px rgba(0,0,0,0.24)",
  },
  dropdownOption: {
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
  },
  remainingBoardsCount: {
    fontSize: "12px",
  },
};

export default function CreateBoardModal({ modalPosition, workspaces, setWorkspaces }) {
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState("");
  const [isDropped, setIsDropped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [createNewBoardIsLoading, setCreateNewBoardIsLoading] = useState(false);
  // const [workspaces, setWorkspaces] = useState([]);
  const boardTitleRef = useRef();

  const { top, left } = modalPosition;

  // const getUsername = useUserStore((state) => state.checkLocalStorage)
  // console.log("getusername", getUsername().username)

  const closeCreateBoardModal = useBoardStore(
    (state) => state.closeCreateBoardModal
  );

  const getUserData = useUserStore((state)=> state.checkLocalStorage);

  const createBoard = useBoardStore((state) => state.createBoard);

  const workspaceId = useBoardStore((state) => state.workspaceId);
  const selectedWorkspace = useBoardStore((state) => state.selectedWorkspace);

  const createBoardTitle = useBoardStore((state) => state.createBoardTitle);
  const setCreateBoardTitle = useBoardStore((state) => state.setCreateBoardTitle);

  const selectedBgColor = useBoardStore((state) => state.selectedBgColor);
  
  const onChangeBoardTitle = (e) => {
    // setBoardTitle(e.target.value);
    setCreateBoardTitle(e.target.value);
    // console.log(e.target.value);
  };

  // const getWorkspaces = async () => { 
  //   const response = await workspaceService._getWorkspaces(`/api/user/${getUsername()._id}/workspaces`);
  //   console.log("response", response);
  //   setIsLoading(false);
  // }
  const handleCreateBoard = async () => {
    const data = getUserData();
    // console.log("clicked createBoard", data)
    const {_id, accessToken} = data;
    setCreateNewBoardIsLoading(true);
    const response = await createBoard({
      id: _id, 
      workspaceId
    }, {
      boardTitle: createBoardTitle,
      bgColor: selectedBgColor,
      workspaceName: selectedWorkspace
    }, accessToken)

    if(response.status >= 200 && response.status < 300){
      toast.success("🦄 A new board has been created successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("🦄 Something went wrong, Try again", {
        position: "top-center",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setCreateNewBoardIsLoading(false);  
    console.log("handleCreateBoard: ", response.data)
    const boardId = response.data.workspace.boards[response.data.workspace.boards.length-1]._id;
    const boardName = response.data.workspace.boards[response.data.workspace.boards.length-1].name;

    setWorkspaces((prevState) => {
      const newState = prevState?.map(workspace => {
        if(workspace.name === selectedWorkspace){ 
          // return {...workspace, boards: response?.data.workspace.boards};
          return {...workspace, boards: [...workspace.boards, response?.data.workspace.boards[response?.data.workspace.boards.length - 1]]};
        }
        return workspace;
      })
      return newState;
    })
    
    closeCreateBoardModal();

    setTimeout(() => {
      navigate(`/b/${boardId}/${boardName}`, {state: {
        userId: _id,
        workspaceId,
      } })
    }, 1000)

  };

  useEffect(() => {
    boardTitleRef.current.focus();  
  }, []);

  // console.log("workspaces inside modal: ", workspaces)
  return createPortal(
   
    <div id="create-board-modal__wrapper" style={{ top, left }}>
  {isLoading ?<FlexContainer height={"500px"}>
    <Loading />
  </FlexContainer> :  (<>
    <header className="create-board-modal__header" style={style.header}>
        <div className="create-board-modal__title" style={style.modalTitle}>
          Create Board
        </div>
        <MdClose className="modal-close-btn" onClick={closeCreateBoardModal} />
      </header>
      <BackgroundSelect />
      <div className="create-board-modal-title__input">
        <label htmlFor="board-title-input">
          Board title<span className="aesterisk"> *</span>
        </label>
        <input
          type="text"
          className={`board-title ${
            boardTitle.length > 0 ? "board-title-typed" : ""
          }`}
          id="board-title-input"
          ref={boardTitleRef}
          onChange={onChangeBoardTitle}
        />
        {boardTitle.length < 1 ? (
          <p className="required-msg">👋 Board title is required</p>
        ) : null}
      </div>
      <div className="select-menu-workspace__label">
        <label htmlFor="default-workspace" className="workspace-label">
          Workspace
        </label>
      </div>
      <SelectMenu workspaces={workspaces} isDropped={isDropped} setIsDropped={setIsDropped}/>
      <button
        className={`create-board-btn ${
          createBoardTitle.length > 0 ? "create-board-active-btn" : ""
        }`}
        disabled={createBoardTitle.length < 1 ? true : false}
        onClick={() => {
          handleCreateBoard();
        }}
      >
        {createNewBoardIsLoading ?  <PulseLoader color="#fff" size={10} /> : "Create"}
      </button>
      {/* <div className="create-board-modal-__ws-select-menu">
        <label htmlFor="workspace">Workspace</label>
        <input type="text" name="workspace" />
      </div> */}
  </>)}
    </div>,
    document.getElementById("create-board-portal")
  );
}
