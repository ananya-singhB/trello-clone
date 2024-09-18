import React, { useState } from "react";
import { Home } from "../styles/common-styles";
import useBoardsContext from "../context/useBoardsContext";
import CustomAddButton from "../../utils/custom-add-button";

// Under Development
const HomePage: React.FC = () => {
  const {
    state: { currentActiveBoard, boards },
  } = useBoardsContext();
  const [toAddList, setIsToAddList] = useState(false);
  return (
    <Home>
      <div>
        {currentActiveBoard &&
          boards
            ?.filter((board) => board.id === currentActiveBoard)
            ?.map(({ cards }) => (
              <div>
                {cards?.map((card) => (
                  <span>{card.cardName}</span>
                ))}
              </div>
            ))}
      </div>
      <div>
        {toAddList ? (
          <CustomAddButton
            title={boards.length ? "Add another list" : "Add a llist"}
            handleClick={() => setIsToAddList(true)}
          />
        ) : (
          <div onClick={() => setIsToAddList(false)} className="custom-btn">
            Card to create a list
          </div>
        )}
      </div>
    </Home>
  );
};

export default HomePage;
