import React, { useState } from "react";
import { Home } from "../styles/common-styles";
import useBoardsContext from "../context/useBoardsContext";
import AddListOrCard from "./add-list-card";
import { LIST } from "../constats";

// Under Development
const HomePage: React.FC = () => {
  const {
    state: { currentActiveBoard, boards },
  } = useBoardsContext();
  const [toAddList, setIsToAddList] = useState(true);

  console.log('currentActiveBoard', currentActiveBoard)

  if(isNaN(Number(currentActiveBoard)) || !boards.length){
    return (<div>
        <span>
          Please create a board!
        </span>
      </div>)
  }

  const isFirst = boards.find((board) => board.id === currentActiveBoard)?.lists.length
  
  return (
    <Home>
      <div>
        {
          boards
            ?.filter((board) => board.id === currentActiveBoard)
            ?.map(({ lists}, index ) => (
              <div key={`board-${index}`}>
                {lists?.map((list, ind) => (
                  <span key={`${list.listName}-${ind}`}>{list.listName}</span>
                ))}
              </div>
            ))}
      </div>
      <AddListOrCard
        toAdd={toAddList}
        title={isFirst ? "Add another list" : "Add a list"}
        handleAdd={() => setIsToAddList(false)}
        handleClose={() => setIsToAddList(true)}
        type={LIST}
      />
    </Home>
  );
};

export default HomePage;
