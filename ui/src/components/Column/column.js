import React from "react";
import Card from "../Card";
import "./column.scss";

const Column = ({ name, cards }) => (
  <section className="column" key={name}>
    {<span>{name}</span>}
    {cards.length ? (
      cards.map((card) => <Card name={card.name} />)
    ) : (
      <span>Nothing to display yet...</span>
    )}
  </section>
);

export default Column;
