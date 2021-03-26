import React from "react";
import './App.css';
// import TicToc from "./components/TicToc";
import NotesQuiz from "./components/NotesQuiz";


function App() {
  return (
    <div id="App" className="App" style={{fontSize: "14px", fontWeight: "bold"}}>
      Music Notes Quiz
      <NotesQuiz />
    </div>
  );
}

export default App;