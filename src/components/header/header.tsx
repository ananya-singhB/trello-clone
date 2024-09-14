import React from "react";
import { AddBoard, AppHeader } from "../styles/header";
import "../styles";
import { FaPlus } from "react-icons/fa";
import useBoardsContext from "../context/useBoardsContext";
import { ActionTypes } from "../../utils/types";

const Header: React.FC = () => {
  const { state, dispatch } = useBoardsContext();

  const handleAddABoard = () => {
    dispatch({
      type: ActionTypes.ADD_NEW_BOARD,
      payload: { id: `${state.boards.length}`, boardName: `dummy ${state.boards.length}`, cards: [] },
    });
    dispatch({
      type: ActionTypes.SET_ACTIVE_BOARD,
      payload: `${state.boards.length}`,
    });
  };

  return (
    <AppHeader>
      <div className="header-content">
        <h2>Trello Clone</h2>
        <div>
          <AddBoard type="button" onClick={handleAddABoard}>
            <FaPlus />
            &nbsp; Add a board
          </AddBoard>
        </div>
      </div>
    </AppHeader>
  );
};

export default Header;
