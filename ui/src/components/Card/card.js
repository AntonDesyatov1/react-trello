import React from "react";
import { connect } from "react-redux";
import { removeCard } from "../../store/board";

import "./card.scss";

const Card = ({ name, description, removeCard, cardIndex, columnIndex }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData("id", event.target.id);
    event.dataTransfer.setData("from", columnIndex);
  };

  return (
    <div
      className="card"
      id={`${columnIndex}${cardIndex}`}
      key={`${columnIndex}${cardIndex}`}
      draggable={true}
      onDragStart={onDragStart}
    >
      <button
        className="card__remove"
        onClick={() => removeCard({ cardIndex, columnIndex })}
      />
      <span className="card__name">{name}</span>
      <span className="card__description">{description}</span>
    </div>
  );
};

const mapDispatchToProps = {
  removeCard,
};

export default connect(null, mapDispatchToProps)(Card);
