import { RootState } from '../types';
import { UserAchievementsI } from '../types/AchievementsTypes';
import {
  PLAYER_ID_PARAM,
  LOAD_PROFILE_ACHIEVEMENTS,
  LOAD_HIGHLIGHTS,
  SHOW_NOTIFICATION
} from '../constants';
import axios from 'axios';
import { networkManager } from '../NetworkManager';
import { resolve } from 'url';

export function profileMainLoad(playerId: string) {
  return function(dispatch: any, getState: () => RootState) {
    return axios
      .get(networkManager.prefixedPath('user-achievement'), {
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
      .get(networkManager.prefixedPath('games-highlights'), {
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
    return new Promise((resolve, reject) => {
      axios
        .post(networkManager.prefixedPath('change-level'), {
          playerId,
          level
        })
        .then(result => {
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
    });
  };
}
