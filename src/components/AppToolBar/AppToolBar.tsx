import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import DebugDialog from './DebugDialog/DebugDialog';
import LoginButton from '../login-button/LoginButtonContainer';
import { LoginStatus, PageProps } from '../../types';
import ActiveUserAvatar from '../../components/UserAvatar/ActiveUserAvatarContainer';
import backbutton from '../../assets/backbutton.svg';
import socketManager from '../../Managers/socketManager';
import AuthenticationManager from '../../AuthenticationManager';
import tcLogo from '../../assets/TClogo.svg';
export interface AppToolBarProps extends PageProps {
  firstName: string;
  lastName: string;
  picture: string;
  loggedIn: LoginStatus;
  location: any;
  leaveGame: any;
  userHasAchievements: boolean;
  history: any;
  logout: any;
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
    this.onLogout = this.onLogout.bind(this);
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
  get isProfilePage() {
    return this.props.history.location.pathname === '/my-profile';
  }
  get shouldShowAvatar() {
    if (this.props.loggedIn === LoginStatus.loggedIn) {
      if (this.isProfilePage) {
        return this.props.userHasAchievements;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  get shouldShowLogOut() {
    if (this.props.loggedIn === LoginStatus.loggedIn) {
      if (this.isProfilePage) {
        return this.props.userHasAchievements === false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onBack() {
    this.props.history.push('/');
  }
  onLogout() {
    AuthenticationManager.deleteToken();
    this.props.logout(this.props.history);
  }
  get toolbarProps() {
    return {
      classes: {
        root: 'tc-toolbar-root'
      }
    };
  }
  render() {
    return (
      <div id="app-toolbar">
        <AppBar
          position="static"
          color="default"
          classes={{ colorDefault: 'toolbar-default-color' }}
        >
          <Toolbar {...this.toolbarProps}>
            <DebugDialog />
            {this.shouldShowBackbutton && (
              <img
                className="toolbar-icons"
                src={backbutton}
                onClick={this.onBack}
              />
            )}
            <div id="toolbar-layout">
              <img src={tcLogo} id="logo-toolbar" />
              {this.props.loggedIn === LoginStatus.loggedIn &&
                this.shouldShowAvatar && (
                  <ActiveUserAvatar
                    onClick={this.isLogged ? this.navigateToProfile : () => {}}
                  />
                )}
              {this.shouldShowLogOut && (
                <div onClick={this.onLogout}>Log Out</div>
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
