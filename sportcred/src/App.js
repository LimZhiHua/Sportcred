import React, {useState} from "react";
// import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";
import { Button } from 'reactstrap';

import AppRouter from "./router";

let NavBar = () => {
  const [opened, setOpened] = useState(false)
  return (
    <div id="navbar">
      <div className={"body " + ((opened)? "opened":"")}>
        <h1>SportsCred</h1>
        <div>
          <div className="menu-item active"><Link>Open Court</Link></div>
          <div className="menu-item"><Link>Trivia</Link></div>
          <div className="menu-item"><Link>Debates</Link></div>
          <div className="menu-item"><Link>Picks and Predictions</Link></div>
        </div>
      </div>
      <Button className={"burger-btn outline " + ((opened)? "opened":"")} 
              color="secondary"
              onClick={() => setOpened(!opened)}>
        {(opened === false) ? <AiOutlineMenu color="white"/> : <AiOutlineLeft color="white"/>}
      </Button>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="body">
          <AppRouter />
        </div>
      </Router>
    </div>
  );
}

export default App;
