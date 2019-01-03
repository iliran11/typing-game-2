import axios from 'axios';
import { loadFbSdk, getFbLoginStatus, fbLogin } from './utilities';
import {
  SdkLoadedSuccessAction,
  LoginVerificationStatus,
  HandShakeData,
  FacebookStatusAction,
  RootState,
  FbLoginStatus,
  LoginResponse
} from './types';
import {
  SDK_LOAD_SUCESS,
  LOGGED_IN,
  LOGGED_OUT,
  FACEBOOK_LOGGED_IN,
  AUTH_FACEBOOK_HEADER,
  AUTH_HEADER_NAME,
  LOGGING_IN_ACTION,
  SERVER_HANDSHAKE_RECIEVED,
  PLAYER_ID_KEY
} from './constants';

const appId = '653846344985974';

class AuthenticationManager {
  dispatch: any;
  getState: any;
  private static instance: AuthenticationManager;
  private constructor(dispatch: any, getState: RootState) {
    this.dispatch = dispatch;
    this.getState = getState;
  }
  initialAuthentication() {
    loadFbSdk('653846344985974')
      .then((result: any) => {
        this.onSdkLoadedSuccess();
        return getFbLoginStatus();
      })
      .then((result: any) => {
        // TODO: handle not logged in case.
        switch (result.status) {
          case FbLoginStatus.connected:
            this.handleFacebookSuccessLogin(result);
            if (AuthenticationManager.isThereAppToken) {
              this.setAxiosAuth();
            }
            this.verifyAppLogin().then(result => {});
        }
      });
  }
  login(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.dispatch({
        type: LOGGING_IN_ACTION
      });
      this.facebookLogin().then((result: any) => {
        if (this.state.authentication.facebookLoggedIn) {
          axios
            .post('login', {
              [AUTH_FACEBOOK_HEADER]: this.state.authentication.facebookToken
            })
            .then((result: any) => {
              const loginResponse: LoginResponse = result.data;
              localStorage.setItem(AUTH_HEADER_NAME, loginResponse.token);
              localStorage.setItem(
                PLAYER_ID_KEY,
                loginResponse.data.facebookId
              );
              this.setAxiosAuth();
              this.dispatch({
                type: LOGGED_IN
              });
              const handshakeData: HandShakeData = {
                ...loginResponse.data,
                appToken: loginResponse.token
              };
              this.dispatch({
                type: SERVER_HANDSHAKE_RECIEVED,
                payload: handshakeData
              });
              resolve('success-login');
            })
            .catch(() => {
              reject('error in login');
            });
        }
      });
    });
  }
  logout() {
    this.dispatch({
      type: LOGGED_OUT
    });
    AuthenticationManager.deleteToken();
  }

  private facebookLogin() {
    return new Promise(resolve => {
      if (this.state.authentication.facebookLoggedIn) {
        // @ts-ignore
        return resolve(this.state.authentication.facebookToken);
      }
      fbLogin({
        scope: 'email'
      }).then((result: any) => {
        this.handleFacebookSuccessLogin(result);
        return resolve(result.authResponse && result.authResponse.accessToken);
      });
    });
  }
  private handleFacebookSuccessLogin(result: any) {
    let FacebookToken;
    try {
      FacebookToken = result.authResponse.accessToken;
    } catch {
      console.error(result);
    }
    const payload: FacebookStatusAction = {
      loggedIn: true,
      token: FacebookToken
    };
    this.dispatch({
      type: FACEBOOK_LOGGED_IN,
      payload
    });
  }
  verifyAppLogin(): Promise<LoginVerificationStatus> {
    return new Promise(resolve => {
      const appToken = AuthenticationManager.appToken;
      axios
        .get('/verify-login')
        .then(result => {
          const data: LoginVerificationStatus = result.data;
          if (!data.loginStatus) {
            this.dispatch({
              type: LOGGED_OUT
            });
            AuthenticationManager.deleteToken();
            resolve(data);
          }
          if (data.loginStatus === true && appToken) {
            this.dispatch({
              type: LOGGED_IN
            });
            if (data.handshakeData) {
              const handshakeData: HandShakeData = data.handshakeData;
              this.dispatch({
                type: SERVER_HANDSHAKE_RECIEVED,
                payload: handshakeData
              });
            }
            resolve(data);
          }
        })
        .catch(err => {
          this.dispatch({
            type: LOGGED_OUT
          });
          console.log('verify error');
          resolve(err);
        });
    });
  }
  private onSdkLoadedSuccess(): SdkLoadedSuccessAction {
    return {
      type: SDK_LOAD_SUCESS
    };
  }
  private setAxiosAuth() {
    const token = localStorage.getItem(AUTH_HEADER_NAME);
    axios.defaults.headers.common[AUTH_HEADER_NAME] = token;
  }
  static get appToken() {
    return localStorage.getItem(AUTH_HEADER_NAME);
  }
  static get PlayerId() {
    return localStorage.getItem(PLAYER_ID_KEY);
  }
  static get isThereAppToken() {
    return Boolean(this.appToken);
  }
  static deleteToken() {
    localStorage.removeItem(AUTH_HEADER_NAME);
  }
  static initManager(dispatch: any, state: RootState) {
    if (!AuthenticationManager.instance) {
      AuthenticationManager.instance = new AuthenticationManager(
        dispatch,
        state
      );
    }
    return AuthenticationManager.instance;
  }
  private get state(): RootState {
    return this.getState();
  }
  static getInstance(): AuthenticationManager {
    if (!AuthenticationManager.instance) {
      throw Error('authenication manager not initialized!');
    }
    return AuthenticationManager.instance;
  }
}

export default AuthenticationManager;
