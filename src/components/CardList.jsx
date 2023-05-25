import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import "../components/CardList.css";
import Card from "./Card";

export default function CardList({
  id,
  tasks,
  draggable,
  type,
  title,
  onDragStartCard,
  onDragEndCard,
  onDropCardOnColumn,
  onDragOverCard,
  onDropOverCard,
  columnIndex,
  onInputAddCard,
  data,
  findTaskAddData,
  makeColumnTitle,
  // cardIndex,
}) {
  const [isPopupClosed, setPopupIsClosed] = useState(true);
  const cardInputRef = useRef();
  const [isAddCardClicked, setIsAddCardClicked] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  // const [cards, setCards] = useState([]);

  const onClickTogglePopup = () => {
    setPopupIsClosed((prevState) => {
      return !prevState;
    });
    console.log("클릭");
  };

  const onClickToggleAddCard = () => {
    setIsAddCardClicked((prevState) => {
      return !prevState;
    });
    console.log("addcard toggled");
  };

  const onInputGettingCardTitle = (e) => {
    console.log(e.target.value);
    setCardTitle(e.target.value);
  };

  const onClickMakeCard = (id) => {
    // const cardData = {
    //   title: cardTitle,
    // };
    // console.log("id:", id);
    const cardData = {
      taskId: uuidv4(),
      title: cardTitle,
      description: "",
    };
    const copiedData = [...data];
    if (typeof id === "undefined") {
      // {
      //   column: 1,
      //   title: "doing it",
      //   id: 1,
      //   tasks: [
      //     {
      //       taskId: 1,
      //       title: "doing something 1",
      //       description: "doing something more specifically",
      //     },
      //     {
      //       taskId: 2,
      //       title: "doing something 2",
      //       description: "doing something more specifically 2",
      //     },
      //   ],
      // },

      const newCardListData = {
        column: data.length + 1,
        // title:

        tasks: cardData,
      };
    }
    const thisColumn = copiedData.find((column) => {
      return column.id === id;
    });

    const thisColumnIndex = copiedData.findIndex((column) => column.id === id);

    console.log("thisColumnIndex:", thisColumnIndex);
    thisColumn.tasks.push(cardData);

    copiedData[thisColumnIndex] = thisColumn;

    console.log("copiedData:", copiedData);
    //기존의 데이터에 이 컬럼에 새로운 task 데이터 추가
    findTaskAddData(copiedData);

    // console.log("thisColumn :", thisColumn);

    // setCards((prevState) => {
    //   return [...prevState, cardData];
    // });
    onClickToggleAddCard();
    cardInputRef.current.value = "";
  };

  console.log("isAddCardClicked", isAddCardClicked);

  return (
    <>
      {/* <div className="card-list"> */}
      {/* <div className="card-list-header">
        <h2 className="card-list-title">{title}</h2>
        <textarea className="card-list-title-input" name="" id="" value={title}>
          {title}
        </textarea>
        <div className="card-list-action-menu">
          <HiOutlineEllipsisHorizontal onClick={onClickTogglePopup} />
        </div>
      </div> */}
      {/* <div className="card-content"> */}
      {/* {cards &&
          cards.map((card, index) => (
            <Card key={index} title={card.title} />
          ))} */}
      {tasks &&
        tasks?.map((card, cardIndex) => (
          <Card
            id={id}
            key={cardIndex}
            type="card"
            title={card.title}
            draggable
            data-type={type}
            onDragStartCard={onDragStartCard}
            onDragEndCard={onDragEndCard}
            onDragOverCard={onDragOverCard}
            cardIndex={cardIndex}
            columnIndex={columnIndex}
            //   onDrop={onDropOverCard}
            onDropOverCard={onDropOverCard}
          />
        ))}
      {/* </div> */}
      <div className="card-list-footer">
        <div
          className={`add-card ${isAddCardClicked ? "hide" : "show"}`}
          onClick={onClickToggleAddCard}
        >
          <div className="add-card-inner">
            <IoAdd className="add-card-icon" />
            <span className="add-card-btn-support">Add a card</span>
          </div>
        </div>
        <div
          className={`add-card-input-wrapper ${
            isAddCardClicked ? "show" : "hide"
          }`}
        >
          <textarea
            className="add-card-title-input"
            placeholder="Enter a title for this card..."
            onInput={onInputGettingCardTitle}
            // onInput={(e) => onInputAddCard(e)}
            ref={cardInputRef}
            defaultValue=""
          />
        </div>
        {/* add a card 버튼 눌렸을때 display: block 되어야하는 것 */}
        <div
          className={`add-card-controls ${isAddCardClicked ? "show" : "hide"}`}
        >
          <div className="add-card-controls-inner">
            <button
              className="add-card-btn"
              onClick={() => onClickMakeCard(id)}
            >
              Add card
            </button>
            <FiX className="remove-card-btn" onClick={onClickToggleAddCard} />
          </div>
        </div>
      </div>

      <div className={`card-list-popup ${isPopupClosed ? "hide" : "show"}`}>
        <div className="popup-header">
          <span className="popup-header-title">List Actions</span>
          <FiX className="popup-close-btn" onClick={onClickTogglePopup} />
        </div>
        <div className="popup-content">
          <ul className="popup-actions-list">
            <li>
              <span className="popup-action">Add card</span>
            </li>
            <li>
              <span className="popup-action">Copy list</span>
            </li>
            <li>
              <span className="popup-action">Move List</span>
            </li>
          </ul>
          <hr />
          <ul className="popup-actions-list">
            <li>
              <span className="popup-action">Sort by...</span>
            </li>
          </ul>
          <hr />
          <ul className="popup-actions-list">
            <li>
              <span className="popup-action">Archive this list</span>
            </li>
          </ul>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
