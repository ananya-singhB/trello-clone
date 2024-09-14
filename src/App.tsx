import "./App.css";
import Sidebar from "./components/sidebar/sidebar";
import { BoardsProvider } from "./components/context/boardsProvider";
import MainPage from "./components/main";

function App() {
  return (
    <BoardsProvider>
      <div className="App">
        <Sidebar />
        <MainPage />
      </div>
    </BoardsProvider>
  );
}

export default App;
