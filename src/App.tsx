import * as React from 'react';
import './App.css';
import GamePage from './pages/GamePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppToolbar from './components/AppToolBar/AppToolBar';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppToolbar />
        <Router>
          <Route exact={true} path="/" component={GamePage} />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
