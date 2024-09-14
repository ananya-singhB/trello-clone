import React from "react";
import { AppSidebar, BoardsList, SidebarTitle } from "../styles/sidebar";
import useBoardsContext from "../context/useBoardsContext";

const Sidebar = () => {
  const { state } = useBoardsContext();
  return (
    <AppSidebar>
      <SidebarTitle>Your Active Boards: {state.boards.length}</SidebarTitle>
      <BoardsList>
        {state.boards?.map((board) => (
          <li>
            <div>{board.boardName}</div>
          </li>
        ))}
      </BoardsList>
    </AppSidebar>
  );
};

export default Sidebar;
