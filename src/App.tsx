import React, { Fragment } from 'react';
import './css/App.css';
import './css/shadows.css';
import './css/gradients.css';
import './css/utilities.css';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage/ResultPageContainer';
import Home from './pages/HomePage/HomePageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppToolbar from './components/AppToolBar/AppToolBar';

class App extends React.Component {
  render() {
    return (
      <div className="gradient-6" id="app-container">
        <AppToolbar />
        <Router>
          <Fragment>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/game" component={GamePage} />
            <Route exact={true} path="/result" component={ResultPage} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
