import React, { Fragment } from 'react';
import './css/App.css';
import './css/shadows.css';
import './css/gradients.css';
import GamePage from './pages/GamePage';
import Home from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppToolbar from './components/AppToolBar/AppToolBar';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <AppToolbar />
        <Router>
          <Fragment>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/game" component={GamePage} />
          </Fragment>
        </Router>
      </Fragment>
    );
  }
}

export default App;
