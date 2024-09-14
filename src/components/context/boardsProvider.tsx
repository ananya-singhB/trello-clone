import { createContext, ReactNode, useReducer } from "react";
import { BoardContextType, BoardsState } from "../../utils/types";
import boardsReducer from "./boardsReducer";

export const BoardsContext = createContext<BoardContextType | undefined>(
  undefined
);

export const initialBoardsState: BoardsState = {
  boards: [],
  currentActiveBoard: "",
  isSidebarOpen: true,
};

export const BoardsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(boardsReducer, initialBoardsState);

  return (
    <BoardsContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardsContext.Provider>
  );
};
