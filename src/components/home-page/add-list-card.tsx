import { FaTimes } from "react-icons/fa";
import CustomAddButton from "../../utils/custom-add-button";
import { ActionTypes, ArrayElement, List } from "../../utils/types";
import { CARD, LIST } from "../constats";
import Input from "./input";
import { useState } from "react";
import useBoardsContext from "../context/useBoardsContext";

const LayoutType = [LIST, CARD];

const AddListOrCard = ({
  toAdd,
  title,
  handleAdd,
  handleClose,
  type,
}: {
  toAdd: boolean;
  title: string;
  handleAdd: () => void;
  handleClose: () => void;
  type: ArrayElement<typeof LayoutType>;
}) => {
  const {
    state: { boards, currentActiveBoard },
    dispatch,
  } = useBoardsContext();
  const initialListValue = {
    listId: "",
    listName: "",
    boardId: currentActiveBoard,
    cards: [],
  };
  const [value, setValue] = useState<List>(initialListValue);

  const handleCancel = () => {
    handleClose();
    setValue(initialListValue);
  };

  const handleAddItem = () => {
    dispatch({ type: ActionTypes.ADD_NEW_LIST, payload: value });
    handleClose()
  };

  const currentLists = boards.filter((board) => board.id === currentActiveBoard).map((board) => board.lists)
  console.log('value', value, boards)

  const handleNewItemCreate = () => {
    setValue((prev) => ({...prev, listId: `${currentLists.length}`}))
    handleAdd()
  }

  return (
    <div>
      {toAdd ? (
        <CustomAddButton title={title} handleClick={handleNewItemCreate} />
      ) : (
        <div className={type === LIST ? "add-list-item" : "add-card-item"}>
          <Input
            inputType={type === LIST ? "text" : "textarea"}
            value={value.listName}
            setValue={(val) => setValue((prev) => ({ ...prev, listName: val }))}
            placeholder={
              type === LIST
                ? "Enter list name..."
                : "Enter a name for this card..."
            }
          />
          <div className="action-btns">
            <button onClick={handleAddItem} className="primary-add-btn" disabled>
              Add {type === LIST ? "List" : "Card"}
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddListOrCard;
