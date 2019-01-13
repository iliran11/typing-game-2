import {
  NotificationSeverityEnum,
  RootState,
  UserAchievementsI,
  NotificationsReducerI,
  NotificationTypeEnum
} from '../types';
import {
  PLAYER_ID_PARAM,
  LOAD_PROFILE_ACHIEVEMENTS,
  LOAD_HIGHLIGHTS,
  SHOW_NOTIFICATION
} from '../constants';
import axios from 'axios';
import { networkManager } from '../NetworkManager';

export function profileMainLoad(playerId: string) {
  return function(dispatch: any, getState: () => RootState) {
    return axios
      .get(networkManager.prefixedPath('/user-achievement'), {
        params: {
          [PLAYER_ID_PARAM]: playerId
        }
      })
      .then(result => {
        const data: UserAchievementsI = result.data;
        dispatch({
          type: LOAD_PROFILE_ACHIEVEMENTS,
          payload: { playerId, data: result.data }
        });
      });
  };
}

export function fetchHighlights(playerId: string) {
  return function(dispatch: any, getState: () => RootState) {
    const state = getState();
    const playerId = state.authentication.playerId;
    axios
      .get(networkManager.prefixedPath('/games-highlights'), {
        params: { [PLAYER_ID_PARAM]: playerId }
      })
      .then(result => {
        dispatch({
          type: LOAD_HIGHLIGHTS,
          payload: result.data
        });
      });
  };
}

export function updateCustomLevel(level: number) {
  return function(dispatch: any, getState: () => RootState) {
    const state = getState();
    const playerId = state.authentication.playerId;
    axios
      .post(networkManager.prefixedPath('change-level'), {
        playerId,
        level
      })
      .then(result => {
        const payload: NotificationsReducerI = {
          notificationMessage: `Your level was changed to ${level}`,
          notificationType: NotificationTypeEnum.toast,
          notificationSeverity: NotificationSeverityEnum.SUCCESS
        };
        dispatch({
          type: SHOW_NOTIFICATION,
          payload
        });
      })
      .catch(err => {
        const payload: NotificationsReducerI = {
          notificationMessage: `There was a problem ...`,
          notificationSeverity: NotificationSeverityEnum.WARNING,
          notificationType: NotificationTypeEnum.toast
        };
        dispatch({
          type: SHOW_NOTIFICATION,
          payload
        });
      });
  };
}
