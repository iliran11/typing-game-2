import { RootState, UserAchievementsI } from '../types';
import { PLAYER_ID_PARAM, LOAD_PROFILE_ACHIEVEMENTS } from '../constants';
import axios from 'axios';
export function profileMainLoad(playerId: string) {
  return function(dispatch: any, getState: any) {
    const state: RootState = getState();
    axios
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
