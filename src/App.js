import React from "react";
import './App.css';
import { HashRouter as Router } from "react-router-dom";

import AppRouter from "./router";
import Navbar from "./Navbar"; 

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="body">
          <AppRouter />
        </div>
      </Router>
    </div>
  );
}

export default App;
