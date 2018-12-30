import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import DebugDialog from './DebugDialog/DebugDialog';
import LoginButton from '../login-button/LoginButtonContainer';
import { LoginStatus, PageProps } from '../../types';
import ActiveUserAvatar from '../../components/UserAvatar/ActiveUserAvatarContainer';
import {changeHistory} from '../../utilities'

export interface AppToolBarProps extends PageProps {
  firstName: string;
  lastName: string;
  picture: string;
  loggedIn: LoginStatus;
}

export default class AppToolBar extends React.Component<AppToolBarProps, any> {
  constructor(props: AppToolBarProps) {
    super(props);

    this.state = {
      isDebugOpen: false
    };
    this.navigateToProfile = this.navigateToProfile.bind(this);
  }
  handleDebug() {
    this.setState({
      isDebugOpen: true
    });
  }
  navigateToProfile() {
    changeHistory('my-profile');
  }
  get shouldShowPicutre() {
    return this.props.picture && this.props.loggedIn === LoginStatus.loggedIn;
  }
  render() {
    return (
      <div id="app-toolbar">
        <AppBar position="static" color="default">
          <Toolbar>
            <DebugDialog />
            <div id="toolbar-layout">
              <Typography variant="h6" color="inherit">
                Typing Coacher
              </Typography>
              {this.shouldShowPicutre && (
                <ActiveUserAvatar onClick={this.navigateToProfile} />
              )}
              {this.props.loggedIn === LoginStatus.loggedOut && <LoginButton />}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
