import socketManager from '../socketManager';
import axios from 'axios';
import { ROOM_ID_PARM } from '../constants';

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

export function navigateToReplay(roomInstanceId: string) {
  return function(dispatch: any, getState: any) {
    axios
      .get('./game-replay', {
        params: {
          [ROOM_ID_PARM]: roomInstanceId
        }
      })
      .then(result => {
        console.log(result);
      });
  };
}
