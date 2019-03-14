import React, { Fragment } from 'react';
import 'src/css/main.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppToolbar from 'src/components/AppToolBar/AppToolBarContainer';
import GlobalBlockingAlerts from 'src/components/BlockingAlert/GlobalBlockingAlertsContainer';
import {
  GameRouterContainer,
  MyProfilePageContainer,
  HomePageContainer,
  ReplayContainer,
  LoginPageContainer,
  AchievementProgressPageContainer,
  RenderlessInitiatorContainer,
  GenericResultsContainer
} from 'src/pages/pagesIndex';

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
            <Route xact={true} path="/game" component={GameRouterContainer} />
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
            <Route path="/results" component={GenericResultsContainer} />
          </Fragment>
        </Router>
        <GlobalBlockingAlerts />
      </div>
    );
  }
}

export default App;
