import AuthenticationManager from '../AuthenticationManager';
import socketManager from '../socketManager';
import { Socket } from 'dgram';
import { SET_TOUCH_PLATFORM, SET_WEB_PLATFORM } from '../constants';
import { RootState, PlaformEnum } from '../types/typesIndex';

export function initAuthenticationManager(history: any) {
  return function(dispatch: any, getState: any) {
    return AuthenticationManager.initManager(dispatch, getState, history);
  };
}

export function initSocketManager(history: any) {
  return function(dispatch: any, getState: RootState) {
    const result = socketManager.initSocket(dispatch, history, getState);
    return result;
  };
}
// https://stackoverflow.com/a/22058552/2631086
export function initTouchFlag() {
  return function(dispatch: any, getState: () => RootState) {
    const platform = getState().myData.platform;
    if (platform === PlaformEnum.WEB || platform === PlaformEnum.MOBILE) {
      return;
    }
    const body = document.querySelector('body');
    const detectMouse = function(e: any) {
      if (e.type === 'mousedown') {
        alert('mouse');
        dispatch({
          type: SET_WEB_PLATFORM
        });
      } else if (e.type === 'touchstart') {
        alert('touch');
        dispatch({
          type: SET_TOUCH_PLATFORM
        });
      }
      // remove event bindings, so it only runs once
      body!.removeEventListener('mousedown', detectMouse);
      body!.removeEventListener('touchstart', detectMouse);
    };
    // attach both events to body
    body!.addEventListener('mousedown', detectMouse);
    body!.addEventListener('touchstart', detectMouse);
  };
}
