import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./CreateBoardModal.css";
import SelectMenu from "./SelectMenu";
import "./SelectMenu.css";
import BackgroundSelect from "./BackgroundSelect";
import useBoardStore from "../stores/BoardStore";

// const style = {
//   display: "absolute",
//   width: "304px",
// };

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
    textOvverflow: "ellipsis",
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

export default function CreateBoardModal({ modalPosition }) {
  const [boardTitle, setBoardTitle] = useState("");
  const [isDropped, setIsDropped] = useState(false);
  const boardTitleRef = useRef();

  const { top, left } = modalPosition;

  const closeCreateBoardModal = useBoardStore(
    (state) => state.closeCreateBoardModal
  );

  const onChangeBoardTitle = (e) => {
    setBoardTitle(e.target.value);
    // console.log(e.target.value);
  };

  useEffect(() => {
    boardTitleRef.current.focus();
    // const modal = document.getElementById("create-board-modal__wrapper");

    // modal.addEventListener("click", (e) => {
    //   const screenCenter =
    //     document.querySelector("body").getBoundingClientRect().width / 2;
    //   const clickedElemXposition = e.target.getBoundingClientRect().left;

    //   if (clickedElemXposition > screenCenter) {
    //     console.log(
    //       "right position",
    //       screenCenter,
    //       " / ",
    //       clickedElemXposition
    //     );
    //   }

    //   if (clickedElemXposition < screenCenter) {
    //     console.log(
    //       "left position: ",
    //       screenCenter,
    //       " / ",
    //       clickedElemXposition
    //     );
    //   }
    // });

    // return () => {
    //   modal.removeEventListener("click", () => {
    //     console.log("clean up");
    //   });
    // };
  }, []);
  return createPortal(
    <div id="create-board-modal__wrapper" style={{ top, left }}>
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
      <SelectMenu>
        <div
          className="select-menu__option"
          style={style.option}
          onClick={() => {
            setIsDropped(!isDropped);
          }}
        >
          {/* // 여기가 처음에 모달 봤을때 Default 워크스페이스 값 보여주는곳 */}

          <div
            className="select-menu__default-value"
            id="default-workspace"
            style={style.defaultValue}
          >
            난경제적으로풍요롭다
          </div>
          <MdOutlineKeyboardArrowDown
            className="arrow-down__icon"
            style={style.arrowDownIcon}
          />
          {/* // 드랍다운 메뉴들 */}
        </div>
        {isDropped ? (
          <div className="dropdown-menu__wrapper" style={style.dropdownMenu}>
            <div className="dropdown-option" style={style.dropdownOption}>
              <span>난경제적으로풍요롭다</span>
              <span
                className="remaining-boards-count"
                style={style.remainingBoardsCount}
              >
                5 boards remaining
              </span>
            </div>
            <div className="dropdown-option" style={style.dropdownOption}>
              <span>워크스페이스</span>
              <span
                className="remaining-boards-count"
                style={style.remainingBoardsCount}
              >
                7 boards remaining
              </span>
            </div>
          </div>
        ) : null}
      </SelectMenu>
      <button
        className={`create-board-btn ${
          boardTitle.length > 0 ? "create-board-active-btn" : ""
        }`}
        disabled
      >
        Create
      </button>
      {/* <div className="create-board-modal-__ws-select-menu">
        <label htmlFor="workspace">Workspace</label>
        <input type="text" name="workspace" />
      </div> */}
    </div>,
    document.getElementById("create-board-portal")
  );
}
