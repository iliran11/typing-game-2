import {
  SdkLoadedSuccessAction,
  LoginVerificationStatus,
  LoginTokenObject,
  FacebookStatusAction
} from '../types';
import {
  SDK_LOAD_SUCESS,
  LOGGED_IN,
  LOGGED_OUT,
  FACEBOOK_LOGGED_IN
} from '../constants';
import axios from 'axios';
import { loadFbSdk, getFbLoginStatus, fbLogin } from '../utilities';

export function processInitialAuthentication() {
  return function(dispatch: any, getState: any) {
    const appToken = localStorage.getItem('appToken');
    loadFbSdk('653846344985974')
      .then((result: any) => {
        sdkLoadedSuccess();
        return getFbLoginStatus();
      })
      .then((result: any) => {
        // TODO: handle not logged in case.
        const token = result.authResponse.accessToken;
        const payload: FacebookStatusAction = {
          loggedIn: true,
          token
        };
        dispatch({
          type: FACEBOOK_LOGGED_IN,
          payload
        });
      });
    if (appToken) {
      dispatch({
        type: LOGGED_IN
      });
      axios
        .get('/verify-login')
        .then(result => {
          const data: LoginVerificationStatus = result.data;
          if (!data.loginStatus) {
            dispatch({
              type: LOGGED_OUT
            });
          }
        })
        .catch(() => {
          dispatch({
            type: LOGGED_OUT
          });
        });
    }
  };
}
export function doLogin() {
  return function(dispatch: any, getState: any) {
    fbLogin({
      scope: 'email'
    }).then((result: any) => {
      const facebookToken =
        result.authResponse && result.authResponse.accessToken;
      console.log(facebookToken);
      if (facebookToken) {
        localStorage.setItem('facebookToken', facebookToken);
        axios
          .post('login', {
            facebookToken
          })
          .then((result: any) => {
            const data: LoginTokenObject = result.data;
            localStorage.setItem('appToken', data.token);
          });
      }
    });
  };
}
export function sdkLoadedSuccess(): SdkLoadedSuccessAction {
  return {
    type: SDK_LOAD_SUCESS
  };
}
