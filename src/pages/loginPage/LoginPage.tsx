import React, { Fragment } from 'react';
import 'src/css/pages/login-page.scss';
import AuthenticationManager from 'src/AuthenticationManager';
import { LoginStatus } from 'src/types';
import { BoxLoader } from 'src/components/ComponentsIndex';

export interface LoginPageProps {
  history: any;
  loginInProgress: any;
  connectionStatus: LoginStatus;
}

export default class LoginPage extends React.Component<LoginPageProps, any> {
  authenticationManager: AuthenticationManager;
  constructor(props: LoginPageProps) {
    super(props);
    this.authenticationManager = AuthenticationManager.getInstance();
    this.login = this.login.bind(this);
  }
  login() {
    this.props.loginInProgress();
    this.authenticationManager.login();
  }
  public render() {
    return (
      <div id="login-page" className="page">
        {this.props.connectionStatus === LoginStatus.connecting && (
          <BoxLoader message="Connecting to Facebook" />
        )}
        {this.props.connectionStatus !== LoginStatus.connecting && (
          <Fragment>
            <h1>Typing Coacher</h1>
            <p id="first-paragraph">
              By typing games you can improve your typing speed in 5 minutes of
              gaming per day.
            </p>
            <p>Save and share your progress with your friend.</p>
            <button
              id="facebook-login"
              className="button-large"
              onClick={this.login}
            >
              Sign in with <span className="bold">Facebook</span>
            </button>
            <p className="terms-text">
              By signing up, you agree to receive updates and special training
              notification. you can edit this options at any time
            </p>
            <footer id="login-footer" className="terms-text">
              <span>Terms of service</span>
              <span>Privacy policy</span>
            </footer>
          </Fragment>
        )}
      </div>
    );
  }
}
