import React, { useState, useRef, useCallback, useMemo } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import CardList from "../components/CardList";
import "./Board.css";
import AddCardList from "../components/AddCardList";
import defaultData from "../data";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import boardService from "../features/workspace/boardService";
import useUserStore from "../store";
import useBoardStore from "../stores/BoardStore";
// 간략한 데이터 형태
// var cardList = [

//     {
//         cardListTitle: 'Backlog',
//         cards: [
//             {
//                 title: 'card 1',
//                 description: '이 프로젝트는 card1 프로젝트이다',
//                 label: 'frontend',
//                 invitedMembers: ['여태윤', '이정민'],
//             }
//         ]
//     }
// ]

export default function Board() {
  const [isPopupClosed, setPopupIsClosed] = useState(true);
  const [isCardListAdded, setIsCardListAdded] = useState(false);
  // const [cardList, setCardList] = useState(defaultData);
  const [data, setData] = useState(defaultData);

  const { boardId } = useParams();
  // console.log("boardId, ", boardId);
  const [ workspaces, setWorkspaces ]  = useOutletContext();
  const {userId, workspaceId} = useLocation().state;
  // 이전 페이지에서 useNavigate의 State로 넘긴 데이터 가져오기
  // console.log("state from useLocation: ", userId, workspaceId)
  // const {userId, workspaceId} = location.state;
  // console.log("userId: ", userId, "workspaceId: ", workspaceId);

  const getUserData = useUserStore((state)=>state.checkLocalStorage);
  
  console.log("workspaces inside Board", workspaces);
  
  const addNewColumn = useBoardStore((state) => state.addNewColumn);


  const dragOverColumnRef = useRef();
  const startColumnRef = useRef();
  const currentColumnRef = useRef();
  const startCardRef = useRef({});
  const currentCardRef = useRef({});

  // const dragOverCardRef = useRef(); // 드래깅하고있는 카드의 인덱스

  const dragEndCardRef = useRef();

  // 칼럼이 다른 칼럼에 호버됐을때 호버를 당한 칼럼의 상태
  const [isColumnHovered, setIsColumnHovered] = useState(false);

  // 칼럼 타이틀
  const [columnTitle, setColumnTitle] = useState("");

  // const createColumnData = () => {

  // };

  const makeColumnTitleOnly = (e, columnIndex) => {
    console.log(
      "---makeColumnTitleOnly - data[columnIndex]:",
      data[columnIndex]
    );

    const copiedData = [...data];
    // data의 해당 칼럼이 undefined일때
    if (!copiedData[columnIndex]) {
      //업데이트된 칼럼 데이터
      copiedData[columnIndex] = {
        title: e.target.value,
      };

      // copiedData.push()
      console.log("칼럼타이틀:", e.target.value);
      console.log("copiedData: ", copiedData, "columnIndex: ", columnIndex);
      // console.log("copiedData: ", copiedData);

      // setData([...data, copiedData[columnIndex]]);
      // const newColumnData = {
      //   ...copiedData[columnIndex],
      //   title: e.target.value,
      // };
    }
    // console.log(e.target.value);

    // setColumnTitle(e.target.value);
  };

  // const makeColumnTitle = useCallback(
  //   (columnTitle) => {
  //     setColumnTitle(columnTitle);
  //   },
  //   [columnTitle]
  // );

  const makeColumnTitle = (e, columnIndex) => {
    console.log("columnTitle 짓는중", e.target.value);
    console.log(
      "makecolumnTitle ------",
      data[columnIndex],
      "columnIndex::",
      columnIndex
    );
    // setColumnTitle(e.target.value);

    const copiedData = [...data];
    console.log("typeof copiedData[columnIndex]", copiedData[columnIndex]);

    if (typeof copiedData[columnIndex] == "undefined") {
      // copiedData[columnIndex].title = e.target.value;

      copiedData[columnIndex] = {
        column: data.length + 1,
        id: data.length + 1,
        tasks: [],
      };

      const updatedColumn = {
        ...copiedData[columnIndex],
        title: e.target.value,
      };
      console.log("글자 나오고있지?", e.target.value);

      copiedData[columnIndex] = updatedColumn;
      setData(copiedData);

      // setData(copiedData);
    } else {
      const updatedColumn = {
        ...copiedData[columnIndex],
        title: e.target.value,
      };

      copiedData[columnIndex] = updatedColumn;

      setData(copiedData);
    }

    // setData({
    //   ...copiedData,
    //   [copiedData[columnIndex]]: e.target.value,
    // });
  };

  // addCard 할때 텍스트아레아의 인풋값 받아오는 함수
  const [addCardInput, setAddCardInput] = useState("");
  const onInputAddCard = useCallback(
    (e) => {
      // console.log(e.target.value);
      setAddCardInput(e.target.value);
    },
    [addCardInput]
  );

  //카드 만들때 사용자가 입력한 타이틀 값 card Title
  const [cardTitle, setCardTitle] = useState("");
  // const [cards, setCards] = useState([]);
  // const [isAddCardClicked, setIsAddCardClicked] = useState(false);
  const cardInputRef = useRef();

  const findTaskAddData = useCallback( // 여기서 http request 보내야함
    (data) => {
      setData((prevData) => {
        return [...data];
      });
      console.log("새로운 카드 추가 후의 data:", data);
    },
    [data]
  );

  // const onClickToggleAddCard = () => {
  //   setIsAddCardClicked((prevState) => {
  //     return !prevState;
  //   });
  //   console.log("addcard toggled");
  // };

  /*
  const onClickMakeCard = (columnId) => {
    const cardData = {
      taskId: uuidv4(),
      title: cardTitle,
      description: "",
    };
    // setCards((prevState) => {
    //   return [...prevState, cardData];
    // });

    const thisColumn = data.find((column) => {
      return column.id === columnId;
    });

    console.log("thisColumn :", thisColumn);
    onClickToggleAddCard();
    // cardInputRef.current.value = "";
  };
  */

  // const currentlyDraggedCardRef = useRef();
  //   const { id } = useParams();

  // 드래그앤드랍 코드 시작
  const beforeOrAfter = (elem, y) => {
    const box = elem.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    // console.log("box:", box, "offset:", offset);

    return offset < 0
      ? { where: "before", id: Number(elem.id) }
      : { where: "after", id: Number(elem.id) };
  };

  const onDragStart = (e, params) => {
    const { column, columnIndex } = params;
    // console.log(
    //   "dragging start...",
    //   params.column.column,
    //   "index: ",
    //   params.index
    // );

    // console.log('paparams);
    e.dataTransfer.setData("text", e.target.id);
    startColumnRef.current = columnIndex;
    console.log("컬럼 드래그 스타트", startColumnRef.current);
    // console.log("currentColumnRef.current", currentColumnRef.current);

    // console.log("parentElement", currentColumnRef.current.parentElement);
    // console.log("e.target:", e.target);
    if (e.target.parentElement.classList.contains("column-wrapper")) {
      e.target.classList.add("column-dragging");
    }

    // if (
    //   currentColumnRef.current.parentElement.classList.contains(
    //     "column-wrapper"
    //   )
    // ) {
    //   currentColumnRef.current.classList.add("column-dragging");
    // }

    // currentColumnRef.current.classList.add("dragging");

    // currentColumnRef.current.addEventListener("dragstart", () => {
    //   currentColumnRef.current.classList.add("dragging");
    // });
    // currentColumnRef.current.style.opacity = "0.5";
  };
  const onDragEndCard = (e, params) => {
    // 드래그하는 요소가 마우스 왼쪽 클릭을 놨을때 그 요소가 찍힘
    const { columnIndex, cardIndex } = params;
    console.log(
      "카드 드래그 end-  columnIndex :",
      columnIndex,
      "cardIndex",
      cardIndex
    );
    // startCardRef.current = {
    //   columnIndex,
    //   cardIndex,
    // };

    dragEndCardRef.current = e.target;

    // console.log("onDragEnd - e.target :", e.target);
    console.log("onDragEnd - e.target :", dragEndCardRef.current);

    if (e.target.dataset.type === "card") {
      // 드래그엔드에서 콘솔로그 columnIndex, cardIndex를 찍으면 값이 처음에 드래그한 카드의 값이 나옴
      console.log(
        "카드드래그 엔드 -- 카드 - columnIndeX: ",
        columnIndex,
        "cardIndeX: ",
        cardIndex
      );
    }
  };

  const onDragEnd = (e, index) => {
    // setIsDragging(false);
    // console.log(
    //   "dragging end...",
    //   params.column.column,
    //   "index: ",
    //   params.index
    // );
    // currentColumnRef.current.classList.remove("dragging");
    console.log("onDragEnd----------", e.target);
    if (e.target.parentElement === "column-header") {
      console.log("나오니");
      // console.log("onDragEnd--------: ", e.target.parentElement);
      // e.target.parentElement.classList.remove("hovered");
    }

    if (
      e.target.dataset.type == "column" &&
      e.target.parentElement.className.includes("column-wrapper")
    ) {
      e.target.classList.remove("column-dragging");

      console.log("이건 컬럼 드래그앤 드랍");
      dragOverColumnRef.current = index;
      // dragOverColumnRef.current = e.target;
      // console.log("dragOverColumnRef.current", dragOverColumnRef.current);

      console.log("drag over 인덱스", dragOverColumnRef.current);
    }

    // if(e.target.dataset.type == "card")

    // currentColumnRef.current = e.target;
    // if (
    //   currentColumnRef.current.parentElement.classList.contains(
    //     "column-wrapper"
    //   )
    // ) {
    //   currentColumnRef.current.classList.remove("column-dragging");
    // }

    // 내가 드래그해서 드래그를 놓았을때의 타겟의 칼럼 인덱스가 나온다.
    // columnindex가 드래그를 시작한 요소의 인덱스임
    // console.log("DragEnd--- columnIndex", e.target.dataset.columnindex);

    if (e.target.dataset.type === "column") {
      // dragOverColumnRef.current = index;
    }

    console.log("dragend");
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    // setIsDragging(true);
    // console.log("drag over..!");
    // console.log("ondragover 인덱스: ", index);
    dragOverColumnRef.current = index;

    if (e.target.dataset.type === "column") {
      // console.log("이건 컬럼 드래그앤 드랍");
      // dragOverColumnRef.current = e.target;
      // console.log("dragOverColumnRef.current", dragOverColumnRef.current);
      // dragOverColumnRef.current = index;
      // console.log("drag over 인덱스", dragOverColumnRef.current);
      // dragOverColumnRef.current = index;
    }

    if (e.target.dataset.type === "card") {
      // console.log("dragOverColumnRef.current:", dragOverColumnRef.current);
      // console.log("이건 카드 드래그앤 드랍");
      // console.log("beforeOrAfter :", beforeOrAfter(e.target, e.clientY));
    }
  };

  const onDragEnter = (e) => {
    // console.log("Drag enter...", e.currentTarget);
    console.log("Drag enter...", e.target.parentElement);

    const columnHeader = e.target.parentElement;

    if (columnHeader.classList.contains("column-header")) {
      columnHeader.classList.add("hovered");
    }

    // if (e.currentTarget.classList.contains("dropzone")) {
    //   // e.currentTarget.style.border = "dashed";
    //   setIsColumnHovered((prev) => {
    //     return !prev;
    //   });

    // }

    // if (e.currentTarget.classList.contains("dropzone")) {
    //   // e.currentTarget.style.border = "dashed";
    //   setIsColumnHovered((prev) => {
    //     return !prev;
    //   });

    // }
    // e.stopPropagation();
    // console.log();
    // if (e.target.parentElement.classList.contains("column-header")) {
    //   console.log("응 컬럼헤더에 드래그했네!");
    // }
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    // console.log(e.target.dataset.type);
    console.log("dropped- column 헤더부분", e.currentTarget);

    // const currentColumnIndex = currentColumnRef.current.dataset.columnindex;
    // const headerIndex = e.target.id; // 드래그를 해서 놓은 자리의 인덱스
    const headerIndex = index; // 드래그를 해서 놓은 자리의 인덱스

    console.log("e.target inside onDrop :", e.target);
    // if (currentColumnRef.current !== dragOverColumnRef.current) {

    if (
      e.target.parentElement.classList.contains("column-header") ||
      e.target.classList.contains("card-list-header")
    ) {
      console.log("column header- drop down--");
      const columnHeader = e.target.parentElement;
      columnHeader.classList.remove("hovered");
    }

    // if (
    //   e.currentTarget.dataset.type === "column" &&
    //   dragEndCardRef.current.dataset.type !== "card"
    // ) {
    //   console.log("이거 카드로 칼럼 헤더에 드랍한거임");
    // }
    if (
      dragEndCardRef.current &&
      dragEndCardRef.current.dataset.type === "card"
    ) {
      return;
    }
    if (
      startColumnRef.current !== dragOverColumnRef.current &&
      e.currentTarget.dataset.type === "column" &&
      e.currentTarget.classList.contains("column-header")
    ) {
      // console.log(
      //   "dragEndCardRef.current.dataset.type",
      //   dragEndCardRef.current.dataset.type
      // );
      // dragEndCardRef.current = null;
      // console.log("headerIndex: ", headerIndex);
      // console.log("컬럼헤더에 드래그했네!");
      const copiedData = [...data];
      // remove and save the dragged item
      // console.log("dragging item", copiedData[currentColumnRef.current]);

      console.log("dragging item", copiedData[startColumnRef.current]);
      console.log("dragging over item", copiedData[dragOverColumnRef.current]);
      // const draggedItem = copiedData.splice(currentColumnRef.current, 1)[0];

      [
        copiedData[startColumnRef.current],
        copiedData[dragOverColumnRef.current],
      ] = [
        copiedData[dragOverColumnRef.current],
        copiedData[startColumnRef.current],
      ];

      // const draggedItem = copiedData.splice(startColumnRef.current, 1)[0];

      // switch the position

      // copiedData.splice(dragOverColumnRef.current, 0, draggedItem);
      console.log("스위치한 데이터", copiedData);

      setData(copiedData);

      startColumnRef.current = null;
      currentColumnRef.current = null;
      dragOverColumnRef.current = null;
    } else {
      return;
    }
  };

  const onDragStartCard = (e, params) => {
    console.log("드래그스타트 타겟:", params);
    const { columnIndex, cardIndex } = params;

    startCardRef.current = {
      columnIndex,
      cardIndex,
    };
    // currentCardRef.current = {
    //   columnIndex: data.columnIndex,
    //   cardIndex: data.cardIndex,
    // };
    // currentCardRef.current.cardIndex = data.cardIndex;
    // console.log("currentCardRef", currentCardRef.current);
  };

  const onDragOverCard = (e, params) => {
    const { columnIndex, cardIndex } = params;
    e.preventDefault();

    currentCardRef.current = {
      columnIndex,
      cardIndex,
    };

    const copiedData = [...data];

    console.log("e,target::", e.target);
    // e.target.querySelector(".card-content").style.height +=
    //   e.target.querySelector(".card").style.height;

    // console.log(
    //   "beforeOrAfter inside onDragOverCard:",
    //   beforeOrAfter(e.target, e.clientY)
    // );
    const { where, id: hoveredElementId } = beforeOrAfter(e.target, e.clientY);
    // const draggedCard = copiedData[
    //   startCardRef.current.columnIndex
    // ].tasks.splice(startCardRef.current.cardIndex, 1)[0];

    // const targetCard = copiedData[
    //   currentCardRef.current.columnIndex
    // ].tasks.splice(currentCardRef.current.cardIndex, 1)[0];

    // console.log("onDragOvercard ---draggedCard::", draggedCard);
    if (
      where === "before" &&
      startCardRef.current.cardIndex !== currentCardRef.current.cardIndex
    ) {
      // console.log("e.target inside onDragOverCard :", [
      //   ...e.target.parentElement.children,
      // ]);
      // const tasksParentElem = e.target.parentElement;
      // const tasksParent = [...e.target.parentElement.children];
      // const thisElem = e.target.innerText; // 드래그를 당하는 요소의 innerText값이 나옴
      /*
      만약 첫번째 요소가 드래깅을 하면서 두번째 요소의 before영역에 들어갔다 그런경우엔 ui가 바뀔 필요가 없다.
      하지만, 두번째 요소의 after 영역에 들어갈 경우 두번째 요소가 첫번재 요소 위치로 와야한다.
  
  */
      // console.log("thisElem: ", thisElem);
      // const test = tasksParent.filter((item) => item.innerText === thisElem);
      // console.log("test : ", test);
    }
    if (where === "after") {
    }

    console.log(
      "카드 드래그 오버 -- columnIndex :",
      columnIndex,
      "cardIndex",
      cardIndex
    );

    // const { where, id: hoveredElementId } = beforeOrAfter(e.target, e.clientY);
  };

  const onDropCardOnColumn = (e, index) => {
    // 카드가 그냥 칼럼에 드랍다운했을때 (카드에 호버 안하고)
    // console.log("카드가 칼럼에 드랍다운 했을떄", e.target, e.currentTarget);
    const copiedData = [...data];

    console.log("onDropCoardOnColumn-  dragEndCardRef::", dragEndCardRef);

    if (
      e.target.dataset.type === "card" &&
      startColumnRef.current !== dragOverColumnRef.current
    ) {
      console.log("카드카드카드카드카드");
    }

    if (
      e.target.dataset.type === "column" &&
      startColumnRef.current !== dragOverColumnRef.current
    ) {
      // console.log("이건 나오나");

      const draggedCard = copiedData[
        startCardRef.current.columnIndex
      ].tasks.splice(startCardRef.current.cardIndex, 1)[0];

      copiedData[dragOverColumnRef.current].tasks.push(draggedCard);

      console.log("칼럼에 그냥 카드 드랍한 후에 데이터--", copiedData);
      setData(copiedData);

      // console.log("칼럼에 그냥 카드 드랍한 후에 데이터 -", data);
    }
  };

  // const onDragOverCardOnColumn = (e) => {
  //   console.log("카드가 칼럼에 드래그 오버할때", e.target);
  // };

  const onDropOverCard = (e, params) => {
    // console.log("params", params);
    const { columnIndex, cardIndex } = params;
    console.log(
      "카드가 다른 카드 위에 드랍다운 됐을때 - columnIndex: ",
      columnIndex,
      "cardIndex : ",
      cardIndex
    );

    console.log("onDropOverCard - e.target", e.currentTarget);

    if (
      e.target.dataset.type === "card" &&
      startCardRef.current.columnIndex === currentCardRef.current.columnIndex &&
      startCardRef.current.cardIndex !== currentCardRef.current.cardIndex
      // &&currentCardRef.current.columnIndex === endCardRef.current.columnIndex
    ) {
      const copiedData = [...data];

      console.log("onDropOverCard - startCardRef: ", startCardRef.current);
      // 드랍다운을 당한 카드

      const draggedCard = copiedData[
        startCardRef.current.columnIndex
      ].tasks.splice(startCardRef.current.cardIndex, 1)[0];

      console.log("draggedCard", draggedCard);

      // switch the position

      copiedData[currentCardRef.current.columnIndex]?.tasks?.splice(
        currentCardRef.current.cardIndex,
        0,
        draggedCard
      );
      console.log("데이터 스위치 후의 데이터", copiedData);
      setData(copiedData);
    } else if (
      e.target.dataset.type === "card" &&
      startCardRef.current.columnIndex !== currentCardRef.current.columnIndex
    ) {
      const copiedData = [...data];
      const { where, id: hoveredElementId } = beforeOrAfter(
        e.target,
        e.clientY
      );

      const draggedCard = copiedData[
        startCardRef.current.columnIndex
      ].tasks.splice(startCardRef.current.cardIndex, 1)[0];

      if (where === "before") {
        // copiedData[currentCardRef.current.columnIndex].tasks[currentCardRef.current.cardIndex]
        copiedData[currentCardRef.current.columnIndex].tasks.splice(
          currentCardRef.current.cardIndex,
          0,
          draggedCard
        );
        console.log("before card:", copiedData);
      }

      if (where === "after") {
        console.log("after....................");
        copiedData[currentCardRef.current.columnIndex].tasks.splice(
          currentCardRef.current.cardIndex + 1,
          0,
          draggedCard
        );
        console.log("after card:", copiedData);
      }

      /*

      
      const draggedCard = copiedData[
        startCardRef.current.columnIndex
      ].tasks.slice(startCardRef.current.cardIndex, 1)[0];
  
      // 드래그 당한 카드 - 타겟 카드
  
      const targetCard = copiedData[
        currentCardRef.current.columnIndex
      ].tasks.slice(currentCardRef.current.cardIndex, 1)[0];
  
      console.log("draggedCard:", draggedCard, "targetCard: ", targetCard);
  
      [
        copiedData[startCardRef.current.columnIndex].tasks[
          startCardRef.current.cardIndex
        ],
        copiedData[currentCardRef.current.columnIndex].tasks[
          currentCardRef.current.cardIndex
        ],
      ] = [
        copiedData[currentCardRef.current.columnIndex].tasks[
          currentCardRef.current.cardIndex
        ],
        copiedData[startCardRef.current.columnIndex].tasks[
          startCardRef.current.cardIndex
        ],
      ];
  
      // copiedData[currentCardRef.current.columnIndex]?.tasks[currentCardRef.current.cardIndex] = copiedData[startCardRef.current.columnIndex].tasks[startCardRef.current.cardIndex]
  
      // copiedData[currentCardRef.current.columnIndex]?.tasks?.splice(
      //   currentCardRef.current.cardIndex,
      //   0,
      //   draggedCard
      // );
  
      // console.log("targetCard: ", targetCard);
      // copiedData[startCardRef.current.columnIndex].tasks[
      //   startCardRef.current.cardIndex
      // ] = targetCard;
  
      // // copiedData[columnIndex].tasks[cardIndex] = draggedCard;
      // copiedData[currentCardRef.current.columnIndex].tasks[
      //   currentCardRef.current.cardIndex
      // ] = draggedCard;
  
      console.log(
        "targetCard 값과 draggedCard 둘다 swapping 했을때:",
        copiedData
      );
  
  
      console.log(
        "칼럼 다른 경우 카드 드래그앤드랍 후에 데이터 스위치 후의 데이터",
        copiedData
      );
      setData(copiedData);
  */

      // console.log('onDropOverCard ',copiedData)
      setData(copiedData);
      startCardRef.current = null;
      currentCardRef.current = null;
    } else if (
      e.target.dataset.type === "card" &&
      // startCardRef.current.columnIndex !== currentCardRef.current.columnIndex &&
      !currentCardRef.current.cardIndex
    ) {
      console.log("카드 그냥 칼럼에 드랍했을때.... 나오나?");
      const draggedCard = copiedData[
        startCardRef.current.columnIndex
      ].tasks.splice(startCardRef.current.cardIndex, 1)[0];

      copiedData[currentCardRef.current.columnIndex].tasks.push(draggedCard);

      console.log("칼럼에 그냥 카드 드랍한 후에 데이터--", copiedData);
      // setData(copiedData);

      // console.log("칼럼에 그냥 카드 드랍한 후에 데이터 -", data);
    } else {
      return;
    }
  };

  // 여기까지가 드래그앤드랍 코드

  const onClickTogglePopup = () => {
    setPopupIsClosed((prevState) => {
      return !prevState;
    });
    console.log("클릭");
  };

  const addCardList = async (cardListTitle, columnIndex) => { //여기서도 http request보내야할곳
    /*
      addCardList
      인풋값을 받은후에
    */
    if (cardListTitle.length < 1) {
      alert("칼럼 타이틀을 입력해주세요 !");
      return;
    }

    const copiedData = [...data];

    if (!copiedData[columnIndex]) {
      // copiedData[columnIndex].title = e.target.value;

      copiedData[columnIndex] = {
        column: data.length + 1,
        id: data.length + 1,
        tasks: [],
      };

      const updatedColumn = {
        ...copiedData[columnIndex],
        title: cardListTitle,
      };
      // console.log("글자 나오고있지?", e.target.value);

      copiedData[columnIndex] = updatedColumn;

      const {accessToken} = getUserData();
      const response = await addNewColumn({
        id: userId, 
        workspaceId,
        boardId
      },  {
        column: data.length + 1,
        title: cardListTitle,
      }, accessToken);

      console.log("response of addCardList :", response);

      setData(copiedData);

      // setData(copiedData);
    }

    console.log("addCardList 안에 data: ", data);
  };
  console.log("cardList :", data);

  const onDragLeave = (e) => {
    const columnHeader = e.target.parentElement;
    columnHeader.classList.remove("hovered");
  };
  return (
    <div className="kanban">
      <div className="kanban-inner">
        {data &&
          data.map((column, columnIndex) => (
            <div className="column-wrapper" key={columnIndex}>
              <div
                id={columnIndex}
                draggable
                // ref={columnRef}
                data-type="column"
                // className={`column ${isDragging ? "dragging" : ""}`}
                className="column dropzone"
                key={columnIndex}
                // data-columnindex={index}
                // style={columnStyle}
                onDragStart={(e) => onDragStart(e, { column, columnIndex })}
                onDragEnd={(e) => onDragEnd(e, columnIndex)}
                onDrop={(e) => onDropCardOnColumn(e, columnIndex)}
                onDragOver={(e) => onDragOver(e, columnIndex)}
                onDragEnter={(e) => onDragEnter(e)}
                onDragLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                <div
                  key={columnIndex}
                  id={column.id}
                  className="column-header"
                  data-type="column"
                  // onDragEnd={(e) => onDragEnd(e, { column, index })}
                  onDragEnd={(e) => onDragEnd(e, columnIndex)}
                  onDragLeave={onDragLeave}
                  onDragOver={(e) => onDragOver(e, columnIndex)}
                  onDrop={(e) => onDrop(e, columnIndex)}
                  // onDragEnter={(e) => console.log("onDragEnter!!", e.target)}
                  // style={{ backgroundColor: "brown" }}
                >
                  <h2>Column: {column.column}</h2>
                  <div className="card-list-header">
                    <h2 className="card-list-title">{column.title}</h2>
                    <textarea
                      className="card-list-title-input"
                      name={column.title}
                      id={columnIndex}
                      value={column.title}
                      onInput={(e) => makeColumnTitle(e, columnIndex)}
                    >
                      {column.title}
                    </textarea>
                    <div className="card-list-action-menu">
                      <HiOutlineEllipsisHorizontal
                        onClick={onClickTogglePopup}
                      />
                    </div>
                  </div>
                  {/* <h3>Title: {column.title}</h3> */}
                </div>
                <div
                  className="card-list"
                  // style={tasksStyle}
                >
                  <div className="card-content">
                    {/* {column.tasks.map((task, cardIndex) => ( */}
                    <CardList
                      id={column.id}
                      data={data}
                      key={columnIndex}
                      title={column.title}
                      tasks={column.tasks}
                      draggable
                      data-type="card"
                      type="card"
                      columnIndex={columnIndex}
                      onDragStartCard={onDragStartCard}
                      onDragEndCard={onDragEndCard}
                      // onDragOverCard={(e) =>
                      //   onDragOverCard(e, { columnIndex, cardIndex })
                      // }
                      onDragOverCard={onDragOverCard}
                      onDropOverCard={onDropOverCard}
                      onInputAddCard={onInputAddCard}
                      findTaskAddData={findTaskAddData}
                      // makeColumnTitle={makeColumnTitle}
                      // onClickMakeCard={() => onClickMakeCard(column.id)}
                      // onClickMakeCard={onClickMakeCard}
                      // isAddCardClicked={isAddCardClicked}
                      // onClickToggleAddCard={onClickToggleAddCard}
                      // onDragEnter={onDragEnter}
                    />
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        <AddCardList
          addCardList={addCardList}
          makeColumnTitle={makeColumnTitle}
          makeColumnTitleOnly={makeColumnTitleOnly}
          // workspaceId={}
          // columnIndex={columnIndex}
          data={data}
        />
      </div>
    </div>
  );
}
