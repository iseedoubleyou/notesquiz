import React from "react";
import './App.css';
// import TicToc from "./components/TicToc";
import Notequiz from "./components/Notequiz";


function App() {
  return (
    <div id="App" className="App">
      Quiz of notes
      <Notequiz />
    </div>
  );
}

export default App;