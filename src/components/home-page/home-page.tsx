import React, { useState } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useBoardsContext from '../context/useBoardsContext'
import AddListOrCard from './add-list-card'
import { CARD, LIST } from '../constats'
import { FaClipboard, FaEllipsisV } from 'react-icons/fa'
import Popover from '../../utils/popover'
import { ActionTypes, DraggableListProps, List } from '../../utils/types'
import DraggableCard from './dragable-card'

const ItemTypes = {
  CARD: 'card',
  LIST: 'list',
}

const DraggableList: React.FC<DraggableListProps> = ({
  list,
  listIndex,
  moveCard,
  moveList,
  currentActiveList,
  toAddCard,
  setIsToAddList,
  setIsToAddCard,
  setCurrentActiveList,
}) => {
  const { dispatch } = useBoardsContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LIST,
    item: { id: list.listId, index: listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.LIST,
    hover: (item: { id: string; index: number }) => {
      if (item.index !== listIndex) {
        moveList(item.index, listIndex)
        item.index = listIndex
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const handleOpenAction = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const popoverItems = [
    {
      title: 'Discard this list',
      handleClick: (list: List) => {
        dispatch({ type: ActionTypes.REMOVE_LIST, payload: list })
      },
    },
    {
      title: 'Discard all cards in this list',
      handleClick: (list: List) => {
        dispatch({ type: ActionTypes.DISCARD_LIST_CARDS, payload: list })
      },
    },
  ]

  return (
    <div
      ref={drop}
      className='list-content'
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver && canDrop ? 'lightgreen' : 'white',
      }}
    >
      <div ref={drag} className='list-title'>
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
          <DraggableCard
            key={card.cardId}
            card={card}
            cardIndex={cardIndex}
            listIndex={listIndex}
            moveCard={moveCard}
          />
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
          setIsToAddList(true)
          setIsToAddCard(false)
          setCurrentActiveList(listIndex)
        }}
        handleClose={() => {
          setIsToAddCard(true)
          setCurrentActiveList(undefined)
        }}
        type={CARD}
        id={listIndex}
      />
    </div>
  )
}

const HomePage: React.FC = () => {
  const {
    state: { currentActiveBoard, boards },
    dispatch,
  } = useBoardsContext()
  const [toAddList, setIsToAddList] = useState(true)
  const [toAddCard, setIsToAddCard] = useState(false)
  const [currentActiveList, setCurrentActiveList] = useState<
    number | undefined
  >(undefined)

  if (isNaN(Number(currentActiveBoard?.split('-').pop())) || !boards.length) {
    return (
      <div className='home'>
        <div className='initial-home'>
          <FaClipboard/>&nbsp;
          <span>No active boards found!</span>
        </div>
      </div>
    )
  }

  const listHasItems = !!boards.find((board) => board.id === currentActiveBoard)
    ?.lists.length

  const moveList = (fromIndex: number, toIndex: number) => {
    const updatedLists = [
      ...(boards.find((board) => board.id === currentActiveBoard)?.lists || []),
    ]
    const [movedList] = updatedLists.splice(fromIndex, 1)
    updatedLists.splice(toIndex, 0, movedList)

    dispatch({
      type: ActionTypes.REARRANGE_LISTS,
      payload: { boardId: currentActiveBoard, lists: updatedLists },
    })
  }

  const moveCard = (
    fromIndex: number,
    toIndex: number,
    fromList: number,
    toList: number
  ) => {
    console.log(
      `Move card from ${fromIndex} to ${toIndex} from ${fromList} to ${toList}`
    )
    if (fromList === toList) {
      const board = boards?.find((item) => item.id === currentActiveBoard)
      const lists = board?.lists
      const cards = board?.lists[toList]?.cards
      if (lists?.length && cards?.length) {
        const updatedCards = [...cards]
        const toMove = updatedCards[fromIndex]
        const listId = toMove.listId
        const boardId = toMove.boardId
        updatedCards.splice(fromIndex, 1)
        updatedCards.splice(toIndex, 0, toMove)

        dispatch({
          type: ActionTypes.REARRANGE_CARDS_IN_LIST,
          payload: { boardId, listId, cards: updatedCards },
        })
      }
    } else {
      //
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='home'>
        {listHasItems &&
          boards
            .filter((board) => board.id === currentActiveBoard)
            .map(({ lists }, index) => (
              <div key={`board-${index}`} className='list-container'>
                {lists.map((list, listIndex) => (
                  <DraggableList
                    key={list.listId}
                    list={list}
                    listIndex={listIndex}
                    moveList={moveList}
                    currentActiveList={currentActiveList}
                    toAddCard={toAddCard}
                    setIsToAddList={setIsToAddList}
                    setIsToAddCard={setIsToAddCard}
                    setCurrentActiveList={setCurrentActiveList}
                    moveCard={moveCard}
                  />
                ))}
              </div>
            ))}
        <AddListOrCard
          toAdd={toAddList}
          title={listHasItems ? 'Add another list' : 'Add a list'}
          handleAdd={() => {
            setCurrentActiveList(undefined)
            setIsToAddCard(true)
            setIsToAddList(false)
          }}
          handleClose={() => setIsToAddList(true)}
          type={LIST}
        />
      </div>
    </DndProvider>
  )
}

export default HomePage
