import socketManager from '../socketManager';
import axios from 'axios';
import { ROOM_ID_PARM, LOAD_REPLAY } from '../constants';
import { GameRecordsModel } from '../types';

import { GAME_HAS_FINISHED, RESTART_GAME } from '../constants';
export function gameIsFinished() {
  return {
    type: GAME_HAS_FINISHED
  };
}

export function restartGame(history: any) {
  return function(dispatch: any, getState: any) {
    dispatch({
      type: RESTART_GAME
    });
    socketManager.emitGameRestart();
    history.push('game');
  };
}

export function navigateToReplay(roomInstanceId: string, pushPage: any) {
  return function(dispatch: any, getState: any) {
    pushPage(`/replay?${ROOM_ID_PARM}=${roomInstanceId}`);
  };
}

export function fetchReplay(roomInstanceId: string) {
  return function(dispatch: any) {
    axios
      .get('./game-replay', {
        params: {
          [ROOM_ID_PARM]: roomInstanceId
        }
      })
      .then(result => {
        const data: GameRecordsModel[] = result.data;
        console.log(result);
        dispatch({
          type: LOAD_REPLAY,
          payload: data
        });
      });
  };
}
