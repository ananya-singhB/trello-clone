import { FaPen } from "react-icons/fa";
import Input from "./input";
import { ActionTypes, Card, DraggableCardProps } from "../../utils/types";
import { useDrag, useDrop } from 'react-dnd';
import { useState } from "react";
import useBoardsContext from "../context/useBoardsContext";

const ItemTypes = {
    CARD: 'card',
    LIST: 'list',
  };

const DraggableCard: React.FC<DraggableCardProps> = ({
    card,
    cardIndex,
    listIndex,
    moveCard,
  }) => {
      const [editingCard, setEditingCard] = useState<Card | undefined>();
  const { dispatch } = useBoardsContext();

    
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.CARD,
      item: { id: card.cardId, indexOfCard: cardIndex, indexOfList: listIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.CARD,
      hover: (item: { id: string; indexOfCard: number; indexOfList: number }) => {
        if (item.id !== card.cardId) {
          moveCard(item.indexOfCard, cardIndex, item.indexOfList, listIndex);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    const handleUpdate = () => {
        if (editingCard?.cardName) {
          dispatch({ type: ActionTypes.UPDATE_CARD, payload: editingCard });
          setEditingCard(undefined);
        }
      };
    
      const handleChange = (value: string) => {
        if(editingCard?.cardId){
          const editingCardValues  = {...editingCard, cardName: value}
          setEditingCard(editingCardValues);
        }
      };
  
    return (
      <div
        ref={(node) => drag(drop(node))}
        className='card-content'
        style={{
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isOver ? 'lightgray' : 'white',
        }}
      >
        {editingCard?.cardId === card.cardId ? (
          <Input
            inputType={'textarea'}
            value={editingCard.cardName}
            setValue={ handleChange}
            placeholder={'Update card name...'}
            handleSave={handleUpdate}
          />
        ) : (
          <>
            <span>{card.cardName}</span>
            <FaPen className='pen' onClick={() => setEditingCard(card)} />
          </>
        )}
      </div>
    );
  };

  export default DraggableCard