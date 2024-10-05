import {
  AppSidebar,
  BoardsList,
  Button,
  SidebarContainer,
  SidebarTitle,
} from '../styles/sidebar';
import useBoardsContext from '../context/useBoardsContext';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ActionTypes } from '../../utils/types';

const Sidebar = () => {
  const {
    state: { isSidebarOpen, boards, currentActiveBoard },
    dispatch,
  } = useBoardsContext();

  const props = { ...{ isOpen: isSidebarOpen } };
  console.log('boards', boards, 'currentActiveBoard', currentActiveBoard);

  return (
    <SidebarContainer {...props}>
      <AppSidebar>
        <SidebarTitle {...props}>
          <span>
            {isSidebarOpen ? `Your Active Boards: ${boards.length}` : ''}
          </span>
          <Button
            onClick={() =>
              dispatch({
                type: ActionTypes.SET_SIDEBAR_STATE,
                payload: !isSidebarOpen,
              })
            }
            title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isSidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
          </Button>
        </SidebarTitle>
        {isSidebarOpen && (
          <BoardsList>
            {boards?.map((board) => (
              <li
                style={{
                  backdropFilter:
                    board.id === currentActiveBoard ? 'sepia(35%)' : 'none',
                }}
                onClick={() =>
                  dispatch({
                    type: ActionTypes.SET_ACTIVE_BOARD,
                    payload: board.id,
                  })
                }
              >
                <div>{board.boardName}</div>
              </li>
            ))}
          </BoardsList>
        )}
      </AppSidebar>
    </SidebarContainer>
  );
};

export default Sidebar;
