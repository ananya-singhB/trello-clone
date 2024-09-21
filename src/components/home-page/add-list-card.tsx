import { FaTimes } from "react-icons/fa";
import CustomAddButton from "../../utils/custom-add-button";
import { ActionTypes, ArrayElement } from "../../utils/types";
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
  const [value, setValue] = useState("");
  const {state: {boards, currentActiveBoard}, dispatch} = useBoardsContext()

  const handleCancel = () => {
    handleClose();
    setValue("");
  };

  const handleAddItem = () => {
    // dispatch({type: ActionTypes.})
  }

  return (
    <div>
      {toAdd ? (
        <CustomAddButton title={title} handleClick={handleAdd} />
      ) : (
        <div className={type === LIST ? "add-list-item" : "add-card-item"}>
          <Input
            inputType={type === LIST ? "text" : "textarea"}
            value={value}
            setValue={setValue}
            placeholder={type === LIST ? "Enter list name..." : "Enter a name for this card..."}
          />
          <div className="action-btns">
            <button onClick={() => {}} className="primary-add-btn">
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
