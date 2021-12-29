import React from "react";
import { connect } from "react-redux";
import { removeCard } from "../../store/board";

import "./card.scss";

const Card = ({ name, description, removeCard, cardIndex, columnIndex }) => (
  <div className="card" key={cardIndex}>
    <button
      className="card__remove"
      onClick={() => removeCard({ cardIndex, columnIndex })}
    />
    <span className="card__name">{name}</span>
    <span className="card__description">{description}</span>
  </div>
);

const mapDispatchToProps = {
  removeCard,
};

export default connect(null, mapDispatchToProps)(Card);
