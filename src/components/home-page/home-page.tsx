import React, { useState } from 'react';
import useBoardsContext from '../context/useBoardsContext';
import AddListOrCard from './add-list-card';
import { CARD, LIST } from '../constats';
import { FaEllipsisV, FaPen } from 'react-icons/fa';
import Popover from '../../utils/popover';
import { ActionTypes, Card, List } from '../../utils/types';
import Input from './input';

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
  // const [boardData, setBoardData] = useState<List[] | []>(
  //   currentActiveBoard
  //     ? boards[Number(currentActiveBoard?.split('-').pop())].lists
  //     : []
  // );
  const [editingCard, setEditingCard] = useState<Card>();

  if (isNaN(Number(currentActiveBoard?.split('-').pop())) || !boards.length) {
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
      handleClick: (list: List) => {
        console.log('Discard this list', list);
        dispatch({ type: ActionTypes.REMOVE_LIST, payload: list });
      },
    },
    {
      title: 'Discard all cards in this list',
      handleClick: (list: List) => {
        console.log('Discard all cards in this list', list);
        dispatch({ type: ActionTypes.DISCARD_LIST_CARDS, payload: list });
      },
    },
  ];

  const handleUpdate = () => {
    if (editingCard?.cardName) {
      dispatch({ type: ActionTypes.UPDATE_CARD, payload: editingCard });
      setEditingCard(undefined);
    }
  };

  const handleChange = (value: string) => {
    setEditingCard((prev) =>
      prev?.cardId ? { ...prev, cardName: value } : undefined
    );
  };

  // console.log('editingCard_______', editingCard, boards);

  return (
    <div className='home'>
      {listHasItems &&
        boards
          ?.filter((board) => board.id === currentActiveBoard)
          ?.map(({ lists }, index) => (
            <div key={`board-${index}`} className='list-container'>
              {lists.map((list, listIndex) => (
                <div className='list-content'>
                  <div className='list-title' id={`drop-${list.listId}`}>
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
                    {list.cards.map((card, cardIndex) => (
                      <div className='card-content'>
                        {editingCard?.cardId === card.cardId &&
                        editingCard?.listId === card.listId ? (
                          <Input
                            inputType={'textarea'}
                            value={card.cardName}
                            setValue={handleChange}
                            placeholder={'Update card name...'}
                            handleSave={handleUpdate}
                          />
                        ) : (
                          <>
                            <span>{card.cardName}</span>
                            <FaPen
                              className='pen'
                              onClick={() => setEditingCard(card)}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <AddListOrCard
                    toAdd={
                      currentActiveList !== undefined
                        ? listIndex !== currentActiveList && !toAddCard
                        : true
                    }
                    title='Add a Card'
                    handleAdd={() => {
                      setIsToAddList(true);
                      setIsToAddCard(false);
                      setCurrentActiveList(listIndex);
                    }}
                    handleClose={() => {
                      setIsToAddCard(true);
                      setCurrentActiveList(undefined);
                    }}
                    type={CARD}
                    id={listIndex}
                  />
                </div>
              ))}
            </div>
          ))}
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
