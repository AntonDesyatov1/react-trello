import axios from "axios";

const FETCH_BOARD_REQUEST = "BOARD/FETCH_BOARD_REQUEST";
const FETCH_BOARD_SUCCESS = "BOARD/FETCH_BOARD_SUCCESS";
const FETCH_BOARD_FAILURE = "BOARD/FETCH_BOARD_FAILURE";

const ADD_CARD_REQUEST = "BOARD/ADD_CARD_REQUEST";
const ADD_CARD_SUCCESS = "BOARD/ADD_CARD_SUCCESS";
const ADD_CARD_FAILURE = "BOARD/ADD_CARD_FAILURE";

const REMOVE_CARD_REQUEST = "BOARD/REMOVE_CARD_REQUEST";
const REMOVE_CARD_SUCCESS = "BOARD/REMOVE_CARD_SUCESS";
const REMOVE_CARD_FAILURE = "BOARD/REMOVE_CARD_FAILURE";

const api = "http://localhost:9000";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_BOARD_REQUEST:
    case ADD_CARD_REQUEST:
    case REMOVE_CARD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BOARD_SUCCESS:
    case ADD_CARD_SUCCESS:
    case REMOVE_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_BOARD_FAILURE:
    case ADD_CARD_FAILURE:
    case REMOVE_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const fetchBoardRequest = () => ({
  type: FETCH_BOARD_REQUEST,
});

const fetchBoardRequestSuccess = (payload) => ({
  type: FETCH_BOARD_SUCCESS,
  payload,
});

const fetchBoardRequestFailure = (payload) => ({
  type: FETCH_BOARD_FAILURE,
  payload,
});

export const fetchBoard = () => async (dispatch) => {
  dispatch(fetchBoardRequest());
  try {
    const { data } = await axios.get(`${api}/fetchboard`);
    dispatch(fetchBoardRequestSuccess(data));
  } catch (error) {
    fetchBoardRequestFailure(error);
  }
};

const addCardRequest = () => ({ type: ADD_CARD_REQUEST });

const addCardSuccess = (payload) => ({ type: ADD_CARD_SUCCESS, payload });

const addCardFailure = (payload) => ({ type: ADD_CARD_FAILURE, payload });

export const addCard = (cardData) => async (dispatch) => {
  dispatch(addCardRequest());
  try {
    const { data } = await axios.post(`${api}/addCard`, null, {
      params: {
        ...cardData,
      },
    });
    dispatch(addCardSuccess(data));
  } catch (error) {
    dispatch(addCardFailure(error));
  }
};

const removeCardRequest = () => ({ type: REMOVE_CARD_REQUEST });

const removeCardSuccess = (payload) => ({ type: REMOVE_CARD_SUCCESS, payload });

const removeCardFailure = (payload) => ({ type: REMOVE_CARD_FAILURE, payload });

export const removeCard =
  ({ cardIndex, columnIndex }) =>
  async (dispatch) => {
    console.log(cardIndex, columnIndex);
    dispatch(removeCardRequest());
    try {
      const { data } = await axios.delete(`${api}/removeCard`, {
        params: {
          cardIndex,
          columnIndex,
        },
      });
      dispatch(removeCardSuccess(data));
    } catch (error) {
      dispatch(removeCardFailure(error));
    }
  };
