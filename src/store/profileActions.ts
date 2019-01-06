import {
  SnackbarTypeEnum,
  RootState,
  UserAchievementsI,
  SnackbarPayloadI
} from '../types';
import {
  PLAYER_ID_PARAM,
  LOAD_PROFILE_ACHIEVEMENTS,
  LOAD_HIGHLIGHTS,
  SHOW_SNACKBAR
} from '../constants';
import axios from 'axios';

export function profileMainLoad(playerId: string) {
  return function(dispatch: any, getState: () => RootState) {
    return axios
      .get('/user-achievement', {
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
      .get('/games-highlights', {
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
      .post('/change-level', {
        playerId,
        level
      })
      .then(result => {
        const payload: SnackbarPayloadI = {
          toastMessage: `Your level was changed to ${level}`,
          toastType: SnackbarTypeEnum.SUCCESS
        };
        dispatch({
          type: SHOW_SNACKBAR,
          payload
        });
      })
      .catch(err => {
        const payload: SnackbarPayloadI = {
          toastMessage: `There was a problem ...`,
          toastType: SnackbarTypeEnum.WARNING
        };
        dispatch({
          type: SHOW_SNACKBAR,
          payload
        });
      });
  };
}
