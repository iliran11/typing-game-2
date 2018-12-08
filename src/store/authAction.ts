import AuthenticationManager from '../AuthenticationManager';

export function initAuthenticationManager() {
  return function(dispatch: any, getState: any) {
    AuthenticationManager.initManager(dispatch, getState);
  };
}
