import * as React from "react";
import "./App.css";
import GameManager from "./components/game-manager/gameManagerContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route exact={true} path="/" component={GameManager} />
      </Router>
    );
  }
}

export default App;
