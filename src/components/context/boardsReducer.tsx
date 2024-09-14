import { ActionTypes, BoardActionTypes, BoardsState } from "../../utils/types";

const boardsReducer = (
  state: BoardsState,
  action: BoardActionTypes
): BoardsState => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_BOARD:
      return { ...state, boards: [...state.boards, action.payload] };
    case ActionTypes.REMOVE_BOARD: {
      return {
        ...state,
        boards: state.boards.filter(({ id }) => id !== action.payload),
      };
    }
    case ActionTypes.UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case ActionTypes.ADD_NEW_CARD:
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === action.payload.boardId
            ? { ...item, cards: [...item.cards, action.payload] }
            : item
        ),
      };
    case ActionTypes.UPDATE_CARD: {
      return {
        ...state,
        boards: state.boards.map((item) => ({
          ...item,
          cards: item.cards.map((card) =>
            card.boardId !== action.payload.boardId &&
            card.cardId !== action.payload.cardId
              ? action.payload
              : card
          ),
        })),
      };
    }
    case ActionTypes.REMOVE_CARD:
      return {
        ...state,
        boards: state.boards.map((item) => ({
          ...item,
          cards: item.cards.filter(
            (card) =>
              card.boardId !== action.payload.boardId &&
              card.cardId !== action.payload.cardId
          ),
        })),
      };
    case ActionTypes.SET_ACTIVE_BOARD:
      return {
        ...state,
        currentActiveBoard: action.payload,
      };
    default:
      return state;
  }
};

export default boardsReducer;
