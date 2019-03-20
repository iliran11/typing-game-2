import React, { Fragment } from 'react';
import {
  Route,
  RouteComponentProps,
  withRouter,
  Switch
} from 'react-router-dom';
import 'src/css/main.scss';
import {
  GameRouterContainer,
  GenericResultsContainer,
  HomePageContainer,
  LoginPageContainer,
  MyProfilePageContainer,
  ReplayContainer
} from 'src/pages/pagesIndex';
import {
  GlobalBlockingAlerts,
  AppToolBarContainer
} from 'src/components/ComponentsIndex';
import { Store } from 'src/middlewares/Store';
import { SocketManager } from './middlewares/socketManager';
import AuthenticationManager from './AuthenticationManager';
import { initTouchFlag } from './utilities';
import { iosShowKeyboard } from 'src/middlewares/IosShowKeyboard';
import { TCNavigator } from 'src/middlewares/TCNavigations';

interface AppProps extends RouteComponentProps {}
class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    SocketManager.initiateSocketManager(
      Store.store.dispatch,
      this.props.history,
      Store.store.getState
    );
    AuthenticationManager.initManager(
      Store.store.dispatch,
      Store.store.getState,
      this.props.history
    );
    initTouchFlag(Store.store.dispatch, Store.store.getState);
    TCNavigator.initNavigators(this.props.history);
  }
  componentDidMount() {
    iosShowKeyboard.init();
  }
  render() {
    return (
      <Fragment>
        <input id="dummy-input" />
        <Route path="/" component={AppToolBarContainer} />
        <Switch>
          <Route exact={true} path="/" component={HomePageContainer} />
          <Route exact={true} path="/game" component={GameRouterContainer} />
          <Route
            exact={true}
            path="/my-profile"
            component={MyProfilePageContainer}
          />
          <Route exact={true} path="/replay" component={ReplayContainer} />
          <Route exact={true} path="/login" component={LoginPageContainer} />
          {/* <Route
            path="/achievements-progress"
            component={AchievementProgressPageContainer}
          /> */}
          <Route path="/results" component={GenericResultsContainer} />
          <GlobalBlockingAlerts />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
