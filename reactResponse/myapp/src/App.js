import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

import Main from "./components/Main";

const Routes = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Main} />
      </div>
    </Router>
  );
};

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
