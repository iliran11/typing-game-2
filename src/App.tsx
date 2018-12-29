import React, { Fragment } from 'react';
import './css/App.css';
import './css/shadows.css';
import './css/gradients.css';
import './css/utilities.css';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage/ResultPageContainer';
import MyProfilePage from './pages/MyProfile/MyProfileContainer';
import GamesHistory from './pages/GamesHistory/GamesHistoryContainer';
import Home from './pages/HomePage/HomePageContainer';
import ReplayPage from './pages/Replay/ReplayContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppToolbar from './components/AppToolBar/AppToolBarContainer';
import AuthenticationManager from './AuthenticationManager';
import LoginPage from './pages/loginPage/LoginPageContainer';

class App extends React.Component {
  authenticationManager: AuthenticationManager;
  constructor(props: any) {
    super(props);
    props.initAuthenticationManager();
    this.authenticationManager = AuthenticationManager.getInstance();
    this.authenticationManager.initialAuthentication();
  }
  render() {
    return (
      <div className="gradient-6" id="app-container">
        <Router>
          <Fragment>
            <Route path="/" component={AppToolbar} />
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/game" component={GamePage} />
            <Route exact={true} path="/result" component={ResultPage} />
            <Route exact={true} path="/my-profile" component={MyProfilePage} />
            <Route exact={true} path="/replay" component={ReplayPage} />
            <Route exact={true} path="/login" component={LoginPage} />
            <Route
              exact={true}
              path="/games-history"
              component={GamesHistory}
            />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
