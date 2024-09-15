import React, { useState } from "react";
import { AddBoard, AppHeader } from "../styles/header";
import "../styles";
import { FaPlus } from "react-icons/fa";
import useBoardsContext from "../context/useBoardsContext";
import { ActionTypes, Board } from "../../utils/types";
import Modal from "../../utils/modal";
import ModalActions from "../../utils/modal-actions";

const Header: React.FC = () => {
  const {
    state: { boards },
    dispatch,
  } = useBoardsContext();
  const initialBoardState = {
    id: "",
    boardName: "",
    cards: [],
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBoard, setCurrentBoard] = useState<Board>({
    id: "",
    boardName: "",
    cards: [],
  });

  const handleAddABoard = () => {
    setCurrentBoard((prev) => ({ ...prev, id: `${boards.length}` }));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrentBoard(initialBoardState);
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    dispatch({
      type: ActionTypes.ADD_NEW_BOARD,
      payload: currentBoard,
    });
    dispatch({
      type: ActionTypes.SET_ACTIVE_BOARD,
      payload: `${boards.length}`,
    });
  };

  return (
    <>
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        actions={
          <ModalActions primaryButton="Confirm" primaryAction={handleConfirm} />
        }
      >
        {/** Child compnent to be defined */}
        <div>currentBoard</div>
      </Modal>
    </>
  );
};

export default Header;
