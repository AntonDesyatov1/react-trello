import { connect } from "react-redux";
import React from "react";
import { fetchBoard, addCard } from "./store/board";
import Column from "./components/Column";
import AddCardModal from "./components/AddCardModal";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import "./App.scss";

class App extends React.Component {
  state = {
    isCardModalOpen: false,
  };

  componentDidMount() {
    this.props.fetchBoard();
  }

  toggleCardModal = () =>
    this.setState(({ isCardModalOpen }) => ({
      isCardModalOpen: !isCardModalOpen,
    }));

  addCard = (cardData) => {
    this.props.addCard(cardData);
    NotificationManager.success(
      "Card has been successfuly created",
      "Success!",
      3000
    );
    this.toggleCardModal();
  };

  render() {
    const { data } = this.props;
    if (!data?.length) {
      return <div>Error</div>;
    }

    return (
      <div className="main-container">
        <button className="add-card" onClick={this.toggleCardModal}>
          Add card
        </button>
        <div className="board">
          {data?.map(({ name, cards }, index) => (
            <Column name={name} cards={cards} columnIndex={index} />
          ))}
        </div>
        {this.state.isCardModalOpen && (
          <AddCardModal
            addCard={this.addCard}
            toggleCardModal={this.toggleCardModal}
          />
        )}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.board.isLoading,
  data: state.board.data,
  error: state.board.error,
});

const mapDispatchToProps = {
  fetchBoard,
  addCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
