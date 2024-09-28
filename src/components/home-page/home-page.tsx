import React, { useState } from "react";
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

  const listHasItems = !!boards.find((board) => board.id === currentActiveBoard)?.lists.length
  
  return (
    <div className="home">
      {listHasItems && <div className="list">
        {
          boards
            ?.filter((board) => board.id === currentActiveBoard)
            ?.map(({ lists}, index ) => (
              <div key={`board-${index}`}>
                {lists?.map((list, ind) => (
                  <div key={`${list.listName}-${ind}`} className="list-title">
                    <span >{list.listName}</span>
                  </div>
                ))}
              </div>
            ))}
      </div>}
      <AddListOrCard
        toAdd={toAddList}
        title={listHasItems ? "Add another list" : "Add a list"}
        handleAdd={() => setIsToAddList(false)}
        handleClose={() => setIsToAddList(true)}
        type={LIST}
      />
    </div>
  );
};

export default HomePage;
