import React, { PureComponent } from 'react';
import AuthenticationManager from '../../AuthenticationManager';
import { LoginStatus } from '../../types';

interface Props {
  isLogged: LoginStatus;
}
class LoginButton extends PureComponent<Props, {}> {
  authenticationManager: AuthenticationManager;

  constructor(props: Props) {
    super(props);
    this.authenticationManager = AuthenticationManager.getInstance();
    this.logout = this.logout.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
  }
  facebookLogin() {
    this.authenticationManager.login();
  }
  logout() {
    this.authenticationManager.logout();
  }
  get buttonContent() {
    switch (this.props.isLogged) {
      case LoginStatus.loggedIn:
        return 'Log Out';
      case LoginStatus.loggedOut:
        return 'Log In';
      case LoginStatus.connecting:
        return 'Connecting ...';
    }
  }
  get onClick() {
    return this.props.isLogged === LoginStatus.loggedIn
      ? this.logout
      : this.facebookLogin;
  }
  render() {
    return (
      <button
        id="compete-now"
        className="button-large gradient-2"
        onClick={this.onClick}
      >
        {this.buttonContent}
      </button>
    );
  }
}

export default LoginButton;
