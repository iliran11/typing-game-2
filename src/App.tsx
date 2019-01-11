import React, { Fragment } from 'react';
import './css/App.css';
import './css/shadows.css';
import './css/gradients.css';
import './css/utilities.css';
import MultiplayerPage from './pages/multiplayer-page/MultiplayerPageContainer';
import ResultPage from './pages/ResultPage/ResultPageContainer';
import ProfilePage from './pages/Profile/ProfilePageContainer';
import GamesHistory from './pages/GamesHistory/GamesHistoryContainer';
import Home from './pages/HomePage/HomePageContainer';
import ReplayPage from './pages/Replay/ReplayContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppToolbar from './components/AppToolBar/AppToolBarContainer';
import AuthenticationManager from './AuthenticationManager';
import LoginPage from './pages/loginPage/LoginPageContainer';
import NotificationManager from './components/NotificationManager/NotificationManagerContainer';

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
            <Route xact={true} path="/game" component={MultiplayerPage} />
            <Route exact={true} path="/result" component={ResultPage} />
            <Route exact={true} path="/my-profile" component={ProfilePage} />
            <Route exact={true} path="/replay" component={ReplayPage} />
            <Route exact={true} path="/login" component={LoginPage} />
            <Route
              exact={true}
              path="/games-history"
              component={GamesHistory}
            />
          </Fragment>
        </Router>
        <NotificationManager />
      </div>
    );
  }
}

export default App;
