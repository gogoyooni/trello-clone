import React, { useState, useRef, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import "./AddCardList.css";

export default function AddCardList({
  addCardList,
  makeColumnTitle,
  data,
  makeColumnTitleOnly,
  // createColumnData,
  // columnIndex,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [cardListTitle, setCardListTitle] = useState("");
  const columnTitleRef = useRef();

  const columnIndex = data.length;

  const onClickToggleCardInput = useCallback(() => {
    setIsClicked((prevState) => {
      return !prevState;
    });
  }, [isClicked]);

  const onInputSettingTitle = useCallback(
    (e) => {
      // console.log(e.target.value);
      setCardListTitle(e.target.value);
    },
    [cardListTitle]
  );

  const clearColumnTitleInput = () => {
    setCardListTitle("");
  };

  const validateColumnTitleInput = () => {
    if (cardListTitle.length < 1) {
      return;
    }
  };

  return (
    <div className="add-card-list">
      <div
        className={`placeholder ${isClicked ? "hide" : "show"}`}
        onClick={onClickToggleCardInput}
      >
        <div className="placeholder-inner">
          <IoAdd />
          <span>Add another list</span>
        </div>
      </div>
      <div
        className={`add-card-list-controls-wrapper ${
          isClicked ? "show" : "hide"
        }`}
      >
        <input
          type="text"
          className="list-name-input"
          placeholder="Enter list title..."
          value={cardListTitle}
          onInput={onInputSettingTitle}
          // ref={columnTitleRef}
          // onChange={(e) => makeColumnTitle(e, columnIndex)}
          // onInput={(e) => makeColumnTitleOnly(e, columnIndex)}
        />
        <div className="add-card-list-controls">
          <button
            className="add-card-list-btn"
            onClick={() => {
              addCardList(cardListTitle, columnIndex);
              clearColumnTitleInput();
            }}
          >
            Add list
          </button>
          <button
            className="remove-card-list-btn"
            onClick={onClickToggleCardInput}
          >
            <FiX style={{ width: "100%", verticalAlign: "text-top" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
