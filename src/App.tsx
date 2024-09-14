import React from "react";
import "./App.css";
import Header from "./components/header/header";
import AppRoutes from "./routes/Routes";
import Sidebar from "./components/sidebar/sidebar";
import { BoardsProvider } from "./components/context/boardsProvider";

function App() {
  return (
    <BoardsProvider>
      <div className="App">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="app-content">
        <Header />
        <AppRoutes />
      </div>
    </div>
    </BoardsProvider>
  );
}

export default App;
