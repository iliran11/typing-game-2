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
  PLAYER_ID_KEY,
  FACEBOOK_LOGIN_FAILURE
} from './constants';
import get from 'lodash.get';
import { networkManager } from './NetworkManager';
import { SocketManager } from './middlewares/socketManager';
import { EnviromentsManager } from 'src/middlewares/EnviromentsManager';

class AuthenticationManager {
  dispatch: any;
  getState: any;
  history: any;
  private static instance: AuthenticationManager;
  private constructor(dispatch: any, getState: RootState, history: any) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.history = history;
    this.initialAuthentication();
  }
  async initialAuthentication() {
    const appId = EnviromentsManager.getAppId();
    console.log(
      '[Authentication] ',
      `FacebookAppId: ${appId}. [ENV] `,
      process.env.REACT_APP_ENV
    );

    await loadFbSdk(appId);
    this.onSdkLoadedSuccess();
    const result: any = await getFbLoginStatus();
    // TODO: handle not logged in case.
    switch (result.status) {
      case FbLoginStatus.connected:
        const isResponseSuccess = this.handleFacebookResponse(result);
        if (isResponseSuccess) {
          if (AuthenticationManager.isThereAppToken) {
            this.setAxiosAuth();
          }
          this.verifyAppLogin();
        }
    }
  }
  async loginPost() {
    try {
      const result = await axios.post(networkManager.prefixedPath('login'), {
        [AUTH_FACEBOOK_HEADER]: this.state.authentication.facebookToken
      });
      return result;
    } catch (e) {
      console.error('error in post to login endpoint');
      throw new Error(e);
    }
  }
  async login(): Promise<string> {
    this.dispatch({
      type: LOGGING_IN_ACTION
    });

    const facebookResult = await this.facebookLogin();
    if (this.state.authentication.facebookLoggedIn) {
      const result = await this.loginPost();
      const loginResponse: LoginResponse = result.data;
      localStorage.setItem(AUTH_HEADER_NAME, loginResponse.token);
      localStorage.setItem(PLAYER_ID_KEY, loginResponse.data.facebookId);
      this.setAxiosAuth();
      try {
        SocketManager.getInstance().reconnect();
      } catch (e) {
        console.log('reconnecting to socket failed');
        throw new Error(e);
      }
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
      this.history.push('/');
      return 'success-login';
    } else {
      return 'failed-login';
    }
  }
  logout() {
    this.dispatch({
      type: LOGGED_OUT
    });
    AuthenticationManager.deleteToken();
  }

  private async facebookLogin() {
    if (this.state.authentication.facebookLoggedIn) {
      // @ts-ignore
      return this.state.authentication.facebookToken;
    }
    const result: any = await fbLogin({
      scope: 'email'
    });
    const isLoginSuccess = this.handleFacebookResponse(result);
    if (isLoginSuccess) {
      return result.authResponse && result.authResponse.accessToken;
    }
  }
  private handleFacebookResponse(result: any): boolean {
    const facebookToken = get(result, ['authResponse', 'accessToken']);
    if (facebookToken) {
      const payload: FacebookStatusAction = {
        loggedIn: true,
        token: facebookToken
      };
      this.dispatch({
        type: FACEBOOK_LOGGED_IN,
        payload
      });
      return true;
    } else {
      this.dispatch({
        type: FACEBOOK_LOGIN_FAILURE
      });

      return false;
    }
  }
  async verifyAppLogin(): Promise<LoginVerificationStatus | null> {
    try {
      const appToken = AuthenticationManager.appToken;
      const result = await axios.get(
        networkManager.prefixedPath('verify-login')
      );
      const data: LoginVerificationStatus = result.data;
      if (!data.loginStatus) {
        this.dispatch({
          type: LOGGED_OUT
        });
        AuthenticationManager.deleteToken();
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
      }
      return data;
    } catch (err) {
      this.dispatch({
        type: LOGGED_OUT
      });
      AuthenticationManager.deleteToken();
      return null;
    }
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
    localStorage.clear();
  }
  static initManager(dispatch: any, state: RootState, history: any) {
    if (!AuthenticationManager.instance) {
      AuthenticationManager.instance = new AuthenticationManager(
        dispatch,
        state,
        history
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
