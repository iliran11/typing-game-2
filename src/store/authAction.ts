import AuthenticationManager from '../AuthenticationManager';
import { FACEBOOK_LOGIN_IN_PROGRESS } from '../constants';

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
