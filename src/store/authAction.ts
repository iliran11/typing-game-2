import AuthenticationManager from '../AuthenticationManager';
import {
  FACEBOOK_LOGIN_IN_PROGRESS,
  LOGOUT,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from '../constants';
import { NotificationTypes } from '../types';
import { fbLogout } from '../utilities';

export function loginInProgress() {
  return {
    type: FACEBOOK_LOGIN_IN_PROGRESS
  };
}

export function logout(history: any) {
  return function(dispatch: any) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { notificationType: NotificationTypes.LOGOUT_NOTIFICATION }
    });
    fbLogout().then(result => {
      dispatch({
        type: LOGOUT
      });
      console.log(result);
      AuthenticationManager.deleteToken();
      history.push('/');
      dispatch({
        type: HIDE_NOTIFICATION
      });
    });
  };
}
