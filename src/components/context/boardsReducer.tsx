import { ActionTypes, BoardActionTypes, BoardsState } from '../../utils/types'

const boardsReducer = (
  state: BoardsState,
  action: BoardActionTypes
): BoardsState => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_BOARD:
      return { ...state, boards: [...state.boards, action.payload] }
    case ActionTypes.REMOVE_BOARD: {
      return {
        ...state,
        boards: state.boards.filter(({ id }) => id !== action.payload),
      }
    }
    case ActionTypes.UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      }
    case ActionTypes.ADD_NEW_LIST:
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === action.payload.boardId
            ? { ...item, lists: [...item.lists, action.payload] }
            : item
        ),
      }
    case ActionTypes.ADD_NEW_CARD:
      return {
        ...state,
        boards: state.boards.map((item) =>
          item.id === action.payload.boardId
            ? {
                ...item,
                lists: item.lists.map((list) =>
                  action.payload.listId === list.listId
                    ? {
                        ...list,
                        cards: [...list.cards, action.payload],
                      }
                    : list
                ),
              }
            : item
        ),
      }
    case ActionTypes.UPDATE_LIST: {
      return {
        ...state,
        boards: state.boards.map((item) => ({
          ...item,
          lists: item.lists.map((list) =>
            list.boardId === action.payload.boardId &&
            list.listId === action.payload.listId
              ? action.payload
              : list
          ),
        })),
      }
    }
    case ActionTypes.UPDATE_CARD: {
      return {
        ...state,
        boards: state.boards.map((item) => ({
          ...item,
          lists: item.lists.map((list) =>
            list.boardId === action.payload.boardId &&
            list.listId === action.payload.listId
              ? {
                  ...list,
                  cards: list.cards.map((card) =>
                    card.cardId === action.payload.cardId
                      ? action.payload
                      : card
                  ),
                }
              : list
          ),
        })),
      }
    }
    case ActionTypes.REMOVE_LIST:
      return {
        ...state,
        boards: state.boards.map((item) => {
          return item.id === action.payload.boardId
            ? {
                ...item,
                lists: item.lists.filter(
                  (list) => list.listId !== action.payload.listId
                ),
              }
            : item
        }),
      }
    case ActionTypes.DISCARD_LIST_CARDS:
      return {
        ...state,
        boards: state.boards.map((item) => {
          return item.id === action.payload.boardId
            ? {
                ...item,
                lists: item.lists.map((list) =>
                  list.listId === action.payload.listId
                    ? { ...list, cards: [] }
                    : list
                ),
              }
            : item
        }),
      }
    case ActionTypes.REMOVE_CARD:
      return {
        ...state,
        boards: state.boards.map((item) => ({
          ...item,
          lists: item.lists.map((list) => ({
            ...list,
            cards: list.cards.filter(
              (card) =>
                card.boardId !== action.payload.boardId &&
                card.listId !== action.payload.listId &&
                card.cardId !== action.payload.cardId
            ),
          })),
        })),
      }
    case ActionTypes.SET_ACTIVE_BOARD:
      return {
        ...state,
        currentActiveBoard: action.payload,
      }
    case ActionTypes.SET_SIDEBAR_STATE:
      return {
        ...state,
        isSidebarOpen: action.payload,
      }
    case ActionTypes.REARRANGE_CARDS_IN_LIST: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.listId === action.payload.listId
                    ? {
                        ...list,
                        cards: action.payload.cards,
                      }
                    : list
                ),
              }
            : board
        ),
      }
    }
    case ActionTypes.REARRANGE_CARDS_INTER_LIST: {
      // Rearrage cards inter lists
      return { ...state }
    }
    case ActionTypes.REARRANGE_LISTS: {
      return { ...state,
        boards: state.boards.map((board) => 
          board.id === action.payload.boardId ? {
            ...board, lists: action.payload.lists
          } : board
        )
       }
    }
    default:
      return state
  }
}

export default boardsReducer
