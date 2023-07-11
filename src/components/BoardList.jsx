import React, {
  useMemo,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  forwardRef,
} from "react";
import { Link } from "react-router-dom";
import RecentlyViewedHeader from "./RecentlyViewedHeader";
import BoardListItem from "./BoardListItem";
import "./BoardList.css";
import CreateBoardModal from "./CreateBoardModal";
import useBoardStore from "../stores/BoardStore";

export default function BoardList({
  boards,
  recentlyViewedBoards,
  recentlyViewed,
  workspaceName,
  workspaceId,
  // createBoardIsClicked,
  // setCreateBoardIsClicked,
  ...props
}) {
  // if (!recentlyViewed && boards?.length === 0) {
  //   return Array.fill(1).map((item, i) => <BoardListItem key={i} noBoard />);
  // }
  // const boardsTest = [];

  // if (boardsTest.length === 0) {
  //   return (
  //     <div className="board-list__wrapper">
  //       <div className="board-list-item">
  //         <div className="board-list-item-bg">ddd</div>
  //       </div>
  //     </div>
  //   );
  // }

  // const createBoardRef = useRef();
  // const [createBoardPosition, setCreateBoardPosition] = useState();

  const refFromUserBoards = useBoardStore((state) => state.ref);
  const createBoardIsClicked = useBoardStore(
    (state) => state.createBoardIsClicked
  );
  const setCreateBoardIsClicked = useBoardStore(
    (state) => state.setCreateBoardIsClicked
  );

  const getCreateBoardPosition = useBoardStore(
    (state) => state.getCreateBoardPosition
  );
  const modalPosition = useBoardStore((state) => state.modalPosition);
  const setModalPosition = useBoardStore((state) => state.setModalPosition);

  const setWorkspaceId = useBoardStore((state) => state.setWorkspaceId);
  const setSelectedWorkspace = useBoardStore((state) => state.setSelectedWorkspace);

  // const setCreateBoardPositions = useBoardStore(
  //   (state) => state.setCreateBoardPositions
  // );

  if (recentlyViewed) {
    return (
      <>
        <div className="board-list__wrapper">
          {recentlyViewedBoards?.map((board, i) => (
            <BoardListItem
              workspaceName={workspaceName}
              key={i}
              boardId={board._id}
              bgColor={board.bgColor}
              bgUrl={board.bgUrl}
              {...props}
              // img={board.img}
            />
          ))}
        </div>
      </>
    );
  }
  // useLayoutEffect(() => {

  // })

  // console.log("boards.length", boards.length);

  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   const createBoard = document.querySelector(".add-board");

  //   const createBoardModal = document.querySelector(
  //     "#create-board-modal__wrapper"
  //   );

  //   // window.addEventListener("resize", () => {
  //   //   // console.log("browser width", window.innerWidth);
  //   //   setWindowSize((prevState) => ({
  //   //     width: window.innerWidth,
  //   //     ...prevState,
  //   //   }));
  //   //   // console.log("window width: ", windowSizes.width);
  //   // });

  //   // console.log("window width: ", windowSize.width);
  //   createBoard.addEventListener("click", (e) => {
  //     const screenCenter = body.getBoundingClientRect().width / 2;
  //     const screenYCenter = body.getBoundingClientRect().height / 2;
  //     // const clickedElemXposition = e.target.getBoundingClientRect().left;
  //     // const clickedElemXposition = e.target.getBoundingClientRect().x;
  //     // const clickedElemYPosition = e.target.getBoundingClientRect().top;
  //     // const clickedElemYPosition = e.target.getBoundingClientRect().y;
  //     console.log("width", createBoardModal.getBoundingClientRect());
  //     console.log("e.target: ", e.target, "e.currentTarget", e.currentTarget);

  //     if (e.target !== e.currentTarget) return;
  //     if (
  //       e.target.classList.contains("add-board") ||
  //       e.target.classList.contains("add-board-message__wrapper") ||
  //       e.target.classList.contains("create-new-board-msg")
  //     ) {
  //       const clickedElemWidth = e.target.getBoundingClientRect().width;
  //       const clickedElemXPosition = e.target.getBoundingClientRect().x;
  //       const clickedElemRightPosition = e.target.getBoundingClientRect().right;
  //       const clickedElemYPosition = e.target.getBoundingClientRect().y;

  //       const createBoardModalHeight =
  //         createBoardModal.getBoundingClientRect().height;

  //       if (clickedElemXPosition > screenCenter) {
  //         console.log(
  //           "right position",
  //           screenCenter,
  //           " / ",
  //           clickedElemXPosition
  //         );
  //         createBoardModal.style.position = "absolute";
  //         createBoardModal.style.left = `-${clickedElemWidth - 5}px`;
  //         createBoardModal.style.top = `-${createBoardModalHeight / 3}px`;
  //       }

  //       if (clickedElemXPosition < screenCenter) {
  //         // console.log(
  //         //   "left position: ",
  //         //   screenCenter,
  //         //   " / ",
  //         //   clickedElemXposition
  //         // );
  //         // console.log("고정값을 보자 ::", e.target.getBoundingClientRect());
  //         // createBoardModal.style.position = "fixed";
  //         // createBoardModal.style.left = `${clickedElemWidth + 5}px`;
  //         // createBoardModal.style.top = `-${createBoardModalHeight / 3}px`;
  //         createBoardModal.style.position = "absolute";
  //         createBoardModal.style.left = `${clickedElemRightPosition + 5}px`;
  //         createBoardModal.style.top = `${createBoardModalHeight / 2}px`;
  //       }
  //       // console.log("x :", clickedElemXposition, "y: ", clickedElemYPosition);
  //       // console.log(clickedElemPosition);
  //     }
  //   });

  //   return () => {
  //     // window.removeEventListener("resize", () => {
  //     //   console.log("clean up -resize event");
  //     // });
  //     createBoard.removeEventListener("click", () => {
  //       console.log("clean up");
  //     });
  //   };
  // }, []);

  // const getCreateBoardPositions = (e) => {
  //   const clickedElemWidth = e.target.getBoundingClientRect().width;
  //   const clickedElemXPosition = e.target.getBoundingClientRect().x;
  //   const clickedElemYPosition = e.target.getBoundingClientRect().y;
  //   const clickedElemRightPosition = e.target.getBoundingClientRect().right; // 요소의 넓이 + y값

  //   return {
  //     width: clickedElemWidth,
  //     x: clickedElemXPosition,
  //     y: clickedElemYPosition,
  //     right: clickedElemRightPosition,
  //   };
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     console.log("Ref:", refFromUserBoards.current.getBoundingClientRect());
  //     setModalPosition(getCreateBoardPosition(refFromUserBoards.current));
  //   });

  //   return () => {
  //     window.removeEventListener("resize", () => {
  //       console.log("clean up resize event");
  //     });
  //   };
  // }, [window.innerWidth]);

  // console.log("Inside boardlist, workspaceId:", workspaceId)
  return (
    <>
      <div className="board-list__wrapper">
        {boards?.map((board, i) => (
          <BoardListItem
            key={i}
            workspaceName={workspaceName}
            name={board.name}
            boardId={board._id}
            bgColor={board.bgColor}
            bgUrl={board.bgUrl}
            {...props}
            // img={board.img}
          />
        ))}
        {!recentlyViewed && (
          <>
            <div
              // to={url}
              className="board-list-item__wrapper add-board"
              ref={refFromUserBoards}
              onClick={(e) => {
                // console.log("클릭될떄", e.currentTarget);
                // if (e.currentTarget.classList.contains("create-board-portal"))
                //   return;

                setCreateBoardIsClicked(!createBoardIsClicked);
                setModalPosition(getCreateBoardPosition(e.target));
                setWorkspaceId(workspaceId)
                setSelectedWorkspace(workspaceName);

                // setCreateBoardPositions(getCreateBoardPositions())
              }}
            >
              <div className="board-list-item">
                {/* <div className="board-list-item add-board"> */}
                <div className="add-board-message__wrapper">
                  <span className="create-new-board-msg">Create new board</span>
                  <span>
                    {/* {boards?.length > 0 && 10 - boards?.length} */}
                    {boards?.length > 0 && 10 - boards.length} Remaining
                  </span>
                </div>
                {/* {createBoardIsClicked ? (
                  <CreateBoardModal
                    modalPosition={modalPosition}
                    // setCreateBoardIsClicked={setCreateBoardIsClicked}
                    // createBoardIsClicked={createBoardIsClicked}
                  />
                ) : null} */}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// export default BoardList;
