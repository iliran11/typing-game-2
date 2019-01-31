import axios from 'axios';
import { RootState } from '../../../types';
import { GameSummryDBI } from '../../../types/schemasTypes';
import { LOAD_GAME_HISTORY_DATA } from '../../../constants';
import { networkManager } from '../../../NetworkManager';

export function fetchGamesHistory() {
  return function(dispatch: any, getState: any) {
    const state: RootState = getState();
    axios
      .get(networkManager.prefixedPath('games-history'), {
        params: { 'user-id-parm': '10155286331682924' }
      })
      .then(response => {
        const gameHistories: GameSummryDBI[] = response.data;
        dispatch({
          type: LOAD_GAME_HISTORY_DATA,
          payload: gameHistories
        });
      });
  };
}
