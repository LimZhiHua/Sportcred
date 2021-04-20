import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Link } from "react-router-dom";

import AppRouter from "./router";

function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
