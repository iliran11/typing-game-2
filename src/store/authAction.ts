import AuthenticationManager from '../AuthenticationManager';
import { FACEBOOK_LOGIN_IN_PROGRESS, LOGOUT } from '../constants';
import { fbLogout } from '../utilities';

export function initAuthenticationManager() {
  return function(dispatch: any, getState: any) {
    AuthenticationManager.initManager(dispatch, getState);
  };
}

export function loginInProgress() {
  return {
    type: FACEBOOK_LOGIN_IN_PROGRESS
  };
}

export function logout() {
  return function(dispatch: any) {
    fbLogout();
    dispatch({
      type: LOGOUT
    });
  };
}
