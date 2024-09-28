import React from "react";
import Header from "./header/header";
import AppRoutes from "../routes/Routes";
import useBoardsContext from "./context/useBoardsContext";

const MainPage: React.FC = () => {
  const {
    state: { isSidebarOpen },
  } = useBoardsContext();

  const appContentStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    width: isSidebarOpen ? "80%" : "97%",
  };

  return (
    <div style={{...appContentStyles}}>
      <Header />
      <AppRoutes />
    </div>
  );
};

export default MainPage;
