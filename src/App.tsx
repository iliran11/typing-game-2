import React, { Fragment } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import 'src/css/main.scss';
import {
  AchievementProgressPageContainer,
  GameRouterContainer,
  GenericResultsContainer,
  HomePageContainer,
  LoginPageContainer,
  MyProfilePageContainer,
  RenderlessInitiatorContainer,
  ReplayContainer
} from 'src/pages/pagesIndex';
import {
  GlobalBlockingAlerts,
  AppToolBarContainer
} from 'src/components/ComponentsIndex';
class App extends React.Component<RouteComponentProps> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <Fragment>
        <Route path="/" component={RenderlessInitiatorContainer} />
        <Route path="/" component={AppToolBarContainer} />
        <Route exact={true} path="/" component={HomePageContainer} />
        <Route exact={true} path="/game" component={GameRouterContainer} />
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
        <GlobalBlockingAlerts />
      </Fragment>
    );
  }
}
export default withRouter(App);
