import { useContext } from "react";
import { BoardsContext } from "./boardsProvider";

const useBoardsContext = () => {
  const context = useContext(BoardsContext);

  if (context === undefined) {
    throw new Error("useBoardsContext was used was used outside of a BoardsProvider");
  }
  return context;
};

export default useBoardsContext;
