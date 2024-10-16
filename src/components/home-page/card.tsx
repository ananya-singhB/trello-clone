import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { ActionTypes, Card } from '../../utils/types';
import Input from './input';
import useBoardsContext from '../context/useBoardsContext';

const CardData = ({ card }: { card: Card }) => {
  const { dispatch } = useBoardsContext();
  const [editingCard, setEditingCard] = useState<Card>();

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

  // handle card update
  return (
    <>
      {editingCard?.cardId === card.cardId ? (
        <Input
          inputType={'textarea'}
          value={card.cardName}
          setValue={handleChange}
          placeholder={'Update card name...'}
          handleSave={handleUpdate}
        />
      ) : (
        <>
          {' '}
          <span>{card.cardName}</span>
          <FaPen className='pen' onClick={() => setEditingCard(card)} />
        </>
      )}
    </>
  );
};

export default CardData;
