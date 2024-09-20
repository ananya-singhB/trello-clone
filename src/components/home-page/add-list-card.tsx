import React from "react";
import CustomAddButton from "../../utils/custom-add-button";

const AddListOrCard = ({
  toAdd,
  title,
  handleAdd,
  handleClose,
}: {
  toAdd: boolean;
  title: string;
  handleAdd: () => void;
  handleClose: () => void;
}) => {
  return (
    <div>
      {toAdd ? (
        <CustomAddButton title={title} handleClick={handleAdd} />
      ) : (
        <div>
          <input value={""} onChange={() => {}} placeholder="Enter list " />
          <button onClick={handleClose} className="custom-btn">
          Card to create a list (Under Development)
        </button>
        </div>
      )}
    </div>
  );
};

export default AddListOrCard;
