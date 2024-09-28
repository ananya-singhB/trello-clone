import React, { useState } from 'react';
import useBoardsContext from '../context/useBoardsContext';
import AddListOrCard from './add-list-card';
import { CARD, LIST } from '../constats';
import { FaEllipsisV } from 'react-icons/fa';

// Under Development
const HomePage: React.FC = () => {
  const {
    state: { currentActiveBoard, boards },
  } = useBoardsContext();
  const [toAddList, setIsToAddList] = useState(true);
  const [toAddCard, setIsToAddCard] = useState(false);

  console.log('currentActiveBoard', currentActiveBoard);

  if (isNaN(Number(currentActiveBoard)) || !boards.length) {
    return (
      <div>
        <span>Please create a board!</span>
      </div>
    );
  }

  const listHasItems = !!boards.find((board) => board.id === currentActiveBoard)
    ?.lists.length;

  return (
    <div className='home'>
      {listHasItems && (
        <div className='list'>
          {boards
            ?.filter((board) => board.id === currentActiveBoard)
            ?.map(({ lists }, index) => (
              <div key={`board-${index}`} className='list-container'>
                {lists?.map((list, ind) => (
                  <div key={`${list.listName}-${ind}`} className='list-content'>
                    <div className='list-title'>
                      <h4>{list.listName}</h4>
                      <FaEllipsisV className='icon' />
                    </div>
                    <AddListOrCard
                      toAdd={toAddCard}
                      title='Add a Card'
                      handleAdd={() => {
                        setIsToAddList(true);
                        setIsToAddCard(false)
                      }}
                      handleClose={() => setIsToAddCard(true)}
                      type={CARD}
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
          setIsToAddCard(true)
          setIsToAddList(false);
        }}
        handleClose={() => setIsToAddList(true)}
        type={LIST}
      />
    </div>
  );
};

export default HomePage;
