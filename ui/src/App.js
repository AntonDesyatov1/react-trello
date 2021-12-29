import { connect } from "react-redux";
import React from "react";
import { fetchBoard, addCard } from "./store/board";
import Column from "./components/Column";
import AddCardModal from "./components/AddCardModal";
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
          {data?.map(({ name, cards }) => (
            <Column name={name} cards={cards} />
          ))}
        </div>
        {this.state.isCardModalOpen && (
          <AddCardModal
            addCard={this.addCard}
            toggleCardModal={this.toggleCardModal}
          />
        )}
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
