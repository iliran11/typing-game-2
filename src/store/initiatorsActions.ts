import AuthenticationManager from '../AuthenticationManager';
import socketManager from '../socketManager';
import { Socket } from 'dgram';

export function initAuthenticationManager(history: any) {
  return function(dispatch: any, getState: any) {
    return AuthenticationManager.initManager(dispatch, getState, history);
  };
}

export function initSocketManager(history: any) {
  return function(dispatch: any, getState: any) {
    const result = socketManager.initSocket(dispatch, history);
    return result;
  };
}
