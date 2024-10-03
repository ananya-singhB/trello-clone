import React, { useState } from 'react';
import useBoardsContext from '../context/useBoardsContext';
import AddListOrCard from './add-list-card';
import { CARD, LIST } from '../constats';
import { FaEllipsisV } from 'react-icons/fa';
import Popover from '../../utils/popover';
import { ActionTypes, List } from '../../utils/types';

// Under Development
const HomePage: React.FC = () => {
  const {
    state: { currentActiveBoard, boards },
    dispatch,
  } = useBoardsContext();
  const [toAddList, setIsToAddList] = useState(true);
  const [toAddCard, setIsToAddCard] = useState(false);
  const [currentActiveList, setCurrentActiveList] = useState<
    number | undefined
  >(undefined);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (isNaN(Number(currentActiveBoard)) || !boards.length) {
    return (
      <div className='home'>
        <span className='initial-home'>Please create a board!</span>
      </div>
    );
  }

  const listHasItems = !!boards.find((board) => board.id === currentActiveBoard)
    ?.lists.length;

  const handleOpenAction = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const popoverItems = [
    {
      title: 'Discard this list',
      handleClick: (list: List) =>
        dispatch({ type: ActionTypes.REMOVE_LIST, payload: list }),
    },
    {
      title: 'Discard all cards in this list',
      handleClick: (list: List) => {},
    },
  ];

  return (
    <div className='home'>
      {listHasItems && (
        <div>
          {boards
            ?.filter((board) => board.id === currentActiveBoard)
            ?.map(({ lists }, index) => (
              <div key={`board-${index}`} className='list-container'>
                {lists?.map((list, ind) => (
                  <div key={`${list.listName}-${ind}`} className='list-content'>
                    <div className='list-title'>
                      <h4>{list.listName}</h4>
                      <span className='actions-icon' onClick={handleOpenAction}>
                        <FaEllipsisV />
                      </span>
                      <Popover
                        title='List actions'
                        children={popoverItems}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        data={list}
                      />
                    </div>
                    <div>
                      {list.cards.map((card) => (
                        <div className='card-content'>{card.cardName}</div>
                      ))}
                    </div>
                    <AddListOrCard
                      toAdd={
                        currentActiveList !== undefined
                          ? ind !== currentActiveList && !toAddCard
                          : true
                      }
                      title='Add a Card'
                      handleAdd={() => {
                        setIsToAddList(true);
                        setIsToAddCard(false);
                        setCurrentActiveList(ind);
                      }}
                      handleClose={() => {
                        setIsToAddCard(true);
                        setCurrentActiveList(undefined);
                      }}
                      type={CARD}
                      id={ind}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
      <AddListOrCard
        toAdd={toAddList}
        title={listHasItems ? 'Add another list' : 'Add a list'}
        handleAdd={() => {
          setCurrentActiveList(undefined);
          setIsToAddCard(true);
          setIsToAddList(false);
        }}
        handleClose={() => setIsToAddList(true)}
        type={LIST}
      />
    </div>
  );
};

export default HomePage;
