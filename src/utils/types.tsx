import React from "react";

export type Card = {
  boardId: string;
  listId: string;
  cardId: string;
  cardName: string;
};

export type List = {
  boardId: string;
  listId: string;
  listName: string;
  cards: Card[] | [];
};

export type Board = {
  id: string;
  boardName: string;
  lists: List[] | [];
};

export type BoardsState = {
  boards: Board[] | [];
  currentActiveBoard: string;
  isSidebarOpen?: boolean;
};

export enum ActionTypes {
  ADD_NEW_BOARD = "ADD_NEW_BOARD",
  UPDATE_BOARD = "UPDATE_BOARD",
  REMOVE_BOARD = "REMOVE_BOARD",
  ADD_NEW_LIST = "ADD_NEW_LIST",
  UPDATE_LIST = "UPDATE_LIST",
  REMOVE_LIST = "REMOVE_LIST",
  ADD_NEW_CARD = "ADD_NEW_CARD",
  UPDATE_CARD = "UPDATE_CARD",
  REMOVE_CARD = "REMOVE_CARD",
  SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD",
  SET_SIDEBAR_STATE = "SET_SIDEBAR_STATE",
}

export type AddNewBoardAction = {
  type: ActionTypes.ADD_NEW_BOARD;
  payload: Board;
};
export type UpdateBoardAction = {
  type: ActionTypes.UPDATE_BOARD;
  payload: Board;
};
export type RemoveBoardAction = {
  type: ActionTypes.REMOVE_BOARD;
  payload: string;
};
export type AddNewListAction = {
  type: ActionTypes.ADD_NEW_LIST;
  payload: List;
};
export type UpdateListAction = { type: ActionTypes.UPDATE_LIST; payload: List };
export type RemoveListAction = {
  type: ActionTypes.REMOVE_LIST;
  payload: List;
};
export type AddNewCardAction = {
  type: ActionTypes.ADD_NEW_CARD;
  payload: Card;
};
export type UpdateCardAction = { type: ActionTypes.UPDATE_CARD; payload: Card };
export type RemoveCardAction = {
  type: ActionTypes.REMOVE_CARD;
  payload: Card;
};
export type SetActiveBoard = {
  type: ActionTypes.SET_ACTIVE_BOARD;
  payload: string;
};
export type SetSidebarState = {
  type: ActionTypes.SET_SIDEBAR_STATE;
  payload: boolean;
};

export type BoardActionTypes =
  | AddNewBoardAction
  | RemoveBoardAction
  | UpdateBoardAction
  | AddNewListAction
  | RemoveListAction
  | UpdateListAction
  | AddNewCardAction
  | RemoveCardAction
  | UpdateCardAction
  | SetActiveBoard
  | SetSidebarState;

export type BoardContextType = {
  state: BoardsState;
  dispatch: React.Dispatch<BoardActionTypes>;
};

export type ModalPropTypes = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
};

export type ModalActionPropsType = {
  primaryButton?: string;
  secondaryButton?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
};

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
