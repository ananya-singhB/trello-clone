import React from 'react';
import './App.css';
import Header from './components/header/header';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <div>
        <AppRoutes/>
      </div>
    </div>
  );
}

export default App;
