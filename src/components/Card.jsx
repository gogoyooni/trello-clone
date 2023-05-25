import React from "react";
import "./Card.css";

export default function Card({
  id,
  title,
  type,
  onDragStartCard,
  onDragEndCard,
  onDropCardOnColumn,
  onDragOverCard,
  onDropOverCard,
  columnIndex,
  cardIndex,
}) {
  return (
    <div className="card">
      <div
        className="card-title"
        draggable
        data-type={type}
        onDragStart={(e) => onDragStartCard(e, { columnIndex, cardIndex })}
        onDragEnd={(e) => onDragEndCard(e, { columnIndex, cardIndex })}
        onDragOver={(e) => onDragOverCard(e, { columnIndex, cardIndex })}
        //   onDrop={onDropOverCard}
        onDrop={(e) => onDropOverCard(e, { columnIndex, cardIndex })}
      >
        <span>{title}</span>
      </div>
    </div>
  );
}
