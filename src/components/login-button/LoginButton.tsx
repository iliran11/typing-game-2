import React, { PureComponent } from 'react';
import AuthenticationManager from '../../AuthenticationManager';
import { LoginStatus } from '../../types';
import { changeHistory } from '../../utilities';

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
    this.onClick = this.onClick.bind(this);
  }
  facebookLogin() {
    this.authenticationManager.login();
  }
  logout() {
    this.authenticationManager.logout();
  }
  onClick() {
    changeHistory('login');
  }
  render() {
    return (
      <button
        className="button-flat"
        onClick={this.onClick}
        style={{ fontSize: 16 }}
      >
        Sign Up
      </button>
    );
  }
}

export default LoginButton;
