import React from "react";

import "./addCardModal.scss";

class AddCardModal extends React.Component {
  state = {
    cardName: null,
  };

  addCard = (event) => {
    event.preventDefault();
    this.props.addCard(this.state);
  };

  handleNameChange = (event) => this.setState({ cardName: event.target.value });

  render() {
    return (
      <div className="add-card-modal__background">
        <div className="add-card-modal">
          <form className="add-card-modal__form" onSubmit={this.addCard}>
            <label>Card name</label>
            <input type="text" onChange={this.handleNameChange} />
            <button onClick={this.addCard}>Confirm</button>
            <button
              className="add-card-modal__close-button"
              onClick={this.props.toggleCardModal}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddCardModal;
