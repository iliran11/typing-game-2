import axios from 'axios';
import { loadFbSdk, getFbLoginStatus, fbLogin } from './utilities';
import {
  SdkLoadedSuccessAction,
  LoginVerificationStatus,
  LoginTokenObject,
  FacebookStatusAction,
  RootState,
  FbLoginStatus
} from './types';
import {
  SDK_LOAD_SUCESS,
  LOGGED_IN,
  LOGGED_OUT,
  FACEBOOK_LOGGED_IN
} from './constants';

const appId = '653846344985974';

class AuthenticationManager {
  dispatch: any;
  getState: any;
  private static instance: AuthenticationManager;
  private constructor(dispatch: any, getState: RootState) {
    console.log('hello manager');
    this.dispatch = dispatch;
    this.getState = getState;
  }
  initialAuthentication() {
    loadFbSdk('653846344985974')
      .then((result: any) => {
        this.sdkLoadedSuccess();
        return getFbLoginStatus();
      })
      .then((result: any) => {
        // TODO: handle not logged in case.
        switch (result.status) {
          case FbLoginStatus.connected:
            this.handleFacebookSuccessLogin(result).then(() => {
              this.verifyAppLogin();
            });
        }
      });
  }
  private handleFacebookSuccessLogin(result: any) {
    {
      return new Promise(resolve => {
        const FacebookToken = result.authResponse.accessToken;
        const payload: FacebookStatusAction = {
          loggedIn: true,
          token: FacebookToken
        };
        this.dispatch({
          type: FACEBOOK_LOGGED_IN,
          payload
        });
        resolve();
      });
    }
  }
  private verifyAppLogin() {
    return new Promise(resolve => {
      const appToken = this.getAppToken();
      axios
        .get('/verify-login')
        .then(result => {
          const data: LoginVerificationStatus = result.data;
          if (!data.loginStatus) {
            this.dispatch({
              type: LOGGED_OUT
            });
            resolve(result);
          }
          if (data.loginStatus === true && appToken) {
            this.setAxiosAuth(appToken);
            this.dispatch({
              type: LOGGED_IN
            });
            resolve(result);
          }
        })
        .catch(err => {
          this.dispatch({
            type: LOGGED_OUT
          });
          resolve(err);
        });
    });
  }
  private sdkLoadedSuccess(): SdkLoadedSuccessAction {
    return {
      type: SDK_LOAD_SUCESS
    };
  }
  private get state(): RootState {
    return this.getState();
  }
  private setAxiosAuth(token: string) {
    axios.defaults.headers.common['Authorization'] = token;
  }
  private getAppToken() {
    return localStorage.getItem('appToken');
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
  static getInstance(): AuthenticationManager {
    if (!AuthenticationManager.instance) {
      throw Error('authenication manager not initialized!');
    }
    return AuthenticationManager.instance;
  }
}

export default AuthenticationManager;
