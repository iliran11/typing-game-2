import axios from 'axios';
import { RootState, GameModelInterface } from '../../../types';
import { LOAD_GAME_HISTORY_DATA } from '../../../constants';

export function fetchGamesHistory() {
  return function(dispatch: any, getState: any) {
    const state: RootState = getState();
    axios
      .get('games-history', {
        params: { 'user-id-parm': '10155286331682924' }
      })
      .then(response => {
        const gameHistories: GameModelInterface[] = response.data;
        dispatch({
          type: LOAD_GAME_HISTORY_DATA,
          payload: { gameHistories, isFetched: true }
        });
      });
  };
}
