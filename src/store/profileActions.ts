import { RootState } from '../types';
import { ProfilePayload, UserAchievementsI } from '../types/typesIndex';
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
    const state = getState();
    return axios
      .get(networkManager.prefixedPath('user-achievement'), {
        params: {
          [PLAYER_ID_PARAM]: playerId
        }
      })
      .then(result => {
        const data: ProfilePayload = result.data;
        const achievementsPayload: UserAchievementsI = {
          totalGames: data.totalGames,
          totalWins: data.totalWins,
          playerId: state.authentication.playerId
        };
        dispatch({
          type: LOAD_PROFILE_ACHIEVEMENTS,
          payload: achievementsPayload
        });
        dispatch({
          type: LOAD_HIGHLIGHTS,
          payload: data.highlights
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
