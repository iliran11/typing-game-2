import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import DebugDialog from './DebugDialog/DebugDialog';
import LoginButton from '../login-button/LoginButtonContainer';
import { LoginStatus, PageProps } from '../../types';
import ActiveUserAvatar from '../../components/UserAvatar/ActiveUserAvatarContainer';
import backbutton from '../../assets/backbutton.svg';
import socketManager from '../../socketManager';

export interface AppToolBarProps extends PageProps {
  firstName: string;
  lastName: string;
  picture: string;
  loggedIn: LoginStatus;
  location: any;
  leaveGame: any;
}

export default class AppToolBar extends React.Component<AppToolBarProps, any> {
  constructor(props: AppToolBarProps) {
    super(props);
    this.onLeaveGame = this.onLeaveGame.bind(this);
    this.state = {
      isDebugOpen: false
    };
    this.navigateToProfile = this.navigateToProfile.bind(this);
    this.onBack = this.onBack.bind(this);
    props.history.listen((location: any, action: any) => {
      console.log(this.currentPath, location);
      if (this.currentPath === '/game' && location.pathname !== '/game') {
        this.onLeaveGame();
      }
    });
  }
  handleDebug() {
    this.setState({
      isDebugOpen: true
    });
  }
  navigateToProfile() {
    this.props.history.push('/my-profile');
  }
  onLeaveGame() {
    this.props.leaveGame();
    socketManager.close();
  }
  get isLogged() {
    return this.props.picture && this.props.loggedIn === LoginStatus.loggedIn;
  }
  get shouldShowBackbutton() {
    return this.props.location.pathname !== '/';
  }
  get currentPath() {
    return this.props.location.pathname;
  }
  onBack() {
    this.props.history.push('/');
  }
  render() {
    return (
      <div id="app-toolbar">
        <AppBar position="static" color="default">
          <Toolbar>
            <DebugDialog />
            {this.shouldShowBackbutton && (
              <img src={backbutton} onClick={this.onBack} />
            )}
            <div id="toolbar-layout">
              <Typography variant="h6" color="inherit">
                Typing Coacher
              </Typography>
              {this.props.loggedIn === LoginStatus.loggedIn && (
                <ActiveUserAvatar
                  onClick={this.isLogged ? this.navigateToProfile : () => {}}
                />
              )}
              {this.props.loggedIn === LoginStatus.loggedOut && (
                <LoginButton history={this.props.history} />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
