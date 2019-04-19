import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import {
  LoginButtonContainer,
  ActiveUserAvatarContainer
} from 'src/components/ComponentsIndex';
import backbutton from 'src/assets/backbutton/backbutton.svg';
import tcLogo from 'src/assets/logo/TClogo.svg';
import AuthenticationManager from 'src/AuthenticationManager';
import { SocketManager } from 'src/middlewares/socketManager';
import { LoginStatus, PageProps } from 'src/types/typesIndex';
import DebugDialog from './DebugDialog/DebugDialog';
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

export class AppToolBar extends React.Component<AppToolBarProps, any> {
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
    SocketManager.getInstance().close();
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
          color="default"
          classes={{ colorDefault: 'toolbar-default-color' }}
          position="fixed"
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
                  <ActiveUserAvatarContainer
                    onClick={this.isLogged ? this.navigateToProfile : () => {}}
                  />
                )}
              {this.shouldShowLogOut && (
                <div onClick={this.onLogout}>Log Out</div>
              )}
              {this.props.loggedIn === LoginStatus.loggedOut && (
                <LoginButtonContainer history={this.props.history} />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
