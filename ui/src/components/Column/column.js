import React from "react";
import { connect } from "react-redux";
import Card from "../Card";
import { moveCard } from "../../store/board";

import "./column.scss";

const Column = ({ name, cards, columnIndex, moveCard }) => {
  const onDragOver = (event) => event.preventDefault();

  const onDrop = (event) => {
    const cardId = event.dataTransfer.getData("id");
    const fromId = event.dataTransfer.getData("from");

    if (fromId !== columnIndex) {
      moveCard({ fromId, toId: columnIndex, cardId });
    }
  };

  return (
    <section className="column">
      <span className="column__name">{name}</span>
      <span
        className="column__cards"
        key={name}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {cards.map(({ name, description }, index) => (
          <Card
            name={name}
            description={description}
            cardIndex={index}
            columnIndex={columnIndex}
          />
        ))}
      </span>
    </section>
  );
};

const mapDispatchToProps = {
  moveCard,
};

export default connect(null, mapDispatchToProps)(Column);
