import React from "react";
import Header from "./header/header";
import AppRoutes from "../routes/Routes";
import useBoardsContext from "./context/useBoardsContext";

const MainPage: React.FC = () => {
  const {
    state: { isSidebarOpen },
  } = useBoardsContext();

  const appContentStyles = {
    display: "flex",
    "flex-direction": "column",
    flex: 1,
    "align-items": "center",
    width: isSidebarOpen ? "80%" : "50%",
  };

  return (
    <div style={appContentStyles}>
      <Header />
      <AppRoutes />
    </div>
  );
};

export default MainPage;
