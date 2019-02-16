import React, { Fragment } from 'react';
import './css/App.css';
import './css/shadows.css';
import './css/gradients.css';
import './css/utilities.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppToolbar from './components/AppToolBar/AppToolBarContainer';
import GlobalBlockingAlerts from './components/BlockingAlert/GlobalBlockingAlertsContainer';
import {
  MultiplayerPageContainer,
  // ResultPageContainer,
  MyProfilePageContainer,
  HomePageContainer,
  ReplayContainer,
  LoginPageContainer,
  AchievementProgressPageContainer,
  RenderlessInitiatorContainer,
  TypingTestPageContainer
} from './pages/pagesIndex';

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="gradient-6" id="app-container">
        <Router>
          <Fragment>
            <Route path="/" component={RenderlessInitiatorContainer} />
            <Route path="/" component={AppToolbar} />
            <Route exact={true} path="/" component={HomePageContainer} />
            <Route
              xact={true}
              path="/game"
              component={MultiplayerPageContainer}
            />
            {/* <Route
              exact={true}
              path="/result"
              component={ResultPageContainer}
            /> */}
            <Route
              exact={true}
              path="/my-profile"
              component={MyProfilePageContainer}
            />
            <Route exact={true} path="/replay" component={ReplayContainer} />
            <Route exact={true} path="/login" component={LoginPageContainer} />
            <Route
              path="/achievements-progress"
              component={AchievementProgressPageContainer}
            />
            <Route path="/typing-test" component={TypingTestPageContainer} />
          </Fragment>
        </Router>
        <GlobalBlockingAlerts />
      </div>
    );
  }
}

export default App;
