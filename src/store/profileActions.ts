import axios from 'axios';
import {
  LOAD_BEST_GAMES,
  LOAD_HIGHLIGHTS,
  LOAD_PROFILE_ACHIEVEMENTS,
  PLAYER_ID_PARAM
} from '../constants';
import { networkManager } from '../NetworkManager';
import { RootState } from '../types';
import { ProfilePayload } from '../types/typesIndex';

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
        const achievementsPayload = data.achievements;
        dispatch({
          type: LOAD_PROFILE_ACHIEVEMENTS,
          payload: achievementsPayload
        });
        dispatch({
          type: LOAD_HIGHLIGHTS,
          payload: data.highlights
        });
        dispatch({
          type: LOAD_BEST_GAMES,
          payload: data.bestGame
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
