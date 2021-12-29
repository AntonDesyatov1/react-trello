import React from "react";
import Card from "../Card";
import "./column.scss";

const Column = ({ name, cards, columnIndex }) => (
  <section className="column" key={name}>
    {<span className="column__name">{name}</span>}
    {cards.length ? (
      cards.map(({ name, description }, index) => (
        <Card
          name={name}
          description={description}
          cardIndex={index}
          columnIndex={columnIndex}
        />
      ))
    ) : (
      <span className="column__empty">Nothing to display yet...</span>
    )}
  </section>
);

export default Column;
