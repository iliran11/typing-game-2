import React, { PureComponent } from 'react';
import AuthenticationManager from '../../AuthenticationManager';
import { LoginStatus } from '../../types';

interface Props {
  isLogged: LoginStatus;
  history: any;
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
    this.props.history.push('/login');
  }
  render() {
    return (
      <button
        className="button-flat"
        onClick={this.onClick}
        style={{ fontSize: 14 }}
      >
        Sign Up
      </button>
    );
  }
}

export default LoginButton;
