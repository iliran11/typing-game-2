import * as React from 'react';
import './App.css';
import GamePage from './pages/GamePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact={true} path="/" component={GamePage} />
      </Router>
    );
  }
}

export default App;
