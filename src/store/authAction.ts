import {
  SdkLoadedSuccessAction,
  LoginVerificationStatus,
  LoginTokenObject,
  FacebookStatusAction,
  RootState,
  FbLoginStatus
} from '../types';
import {
  SDK_LOAD_SUCESS,
  LOGGED_IN,
  LOGGED_OUT,
  FACEBOOK_LOGGED_IN
} from '../constants';
import axios from 'axios';
import { loadFbSdk, getFbLoginStatus, fbLogin } from '../utilities';
import { resolve } from 'path';

export function processInitialAuthentication() {
  return function(dispatch: any, getState: any) {
    loadFbSdk('653846344985974')
      .then((result: any) => {
        sdkLoadedSuccess();
        return getFbLoginStatus();
      })
      .then((result: any) => {
        // TODO: handle not logged in case.
        switch (result.status) {
          case FbLoginStatus.connected:
            handleFacebookSuccessLogin(result, dispatch).then(() => {
              verifyAppLogin(dispatch);
            });
        }
      });
  };
}
export function doLogin() {
  return function(dispatch: any, getState: any) {
    const state: RootState = getState();
    if (state.authentication.facebookLoggedIn) {
      axios
        .post('/login', {
          facebookToken: state.authentication.facebookToken
        })
        .then((result: any) => {
          const data: LoginTokenObject = result.data;
          localStorage.setItem('appToken', data.token);
          setAxiosAuth(data.token);
        });
    } else {
      fbLogin({
        scope: 'email'
      }).then(result => {
        console.log(result);
      });
    }
  };
}
export function sdkLoadedSuccess(): SdkLoadedSuccessAction {
  return {
    type: SDK_LOAD_SUCESS
  };
}

function setAxiosAuth(token: string) {
  axios.defaults.headers.common['Authorization'] = token;
}

function getAppToken() {
  return localStorage.getItem('appToken');
}

function handleFacebookSuccessLogin(result: any, dispatch: any) {
  return new Promise(resolve => {
    const FacebookToken = result.authResponse.accessToken;
    const payload: FacebookStatusAction = {
      loggedIn: true,
      token: FacebookToken
    };
    dispatch({
      type: FACEBOOK_LOGGED_IN,
      payload
    });
    resolve();
  });
}

function verifyAppLogin(dispatch: any) {
  return new Promise(resolve => {
    const appToken = getAppToken();
    axios
      .get('/verify-login')
      .then(result => {
        const data: LoginVerificationStatus = result.data;
        if (!data.loginStatus) {
          dispatch({
            type: LOGGED_OUT
          });
          resolve(result);
        }
        if (data.loginStatus === true && appToken) {
          setAxiosAuth(appToken);
          dispatch({
            type: LOGGED_IN
          });
          resolve(result);
        }
      })
      .catch(err => {
        dispatch({
          type: LOGGED_OUT
        });
        resolve(err);
      });
  });
}
