import { SocketManager } from '../middlewares/socketManager';
import axios from 'axios';
import {
  ROOM_ID_PARM,
  LOAD_REPLAY,
  LOAD_GAME_HISTORY_DATA,
  LOAD_TYPING,
  LEAVE_GAME
} from '../constants';
import { GameRecordsModel, ReplayEndPointResponseI } from '../types';
import { networkManager } from '../NetworkManager';

import { GAME_HAS_FINISHED, RESTART_GAME, PLAYER_ID_PARAM } from '../constants';
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

    SocketManager.getInstance().emitGameRestart();
    history.push('game');
  };
}

export function navigateToReplay(roomInstanceId: string, pushPage: any) {
  return function(dispatch: any, getState: any) {
    pushPage(`/replay?${ROOM_ID_PARM}=${roomInstanceId}`);
  };
}

export function fetchReplay(roomInstanceId: string, playerId: string) {
  return function(dispatch: any) {
    axios
      .get(networkManager.prefixedPath('game-replay'), {
        params: {
          [ROOM_ID_PARM]: roomInstanceId,
          [PLAYER_ID_PARAM]: playerId
        }
      })
      .then(result => {
        const replayEndPointResponse: ReplayEndPointResponseI = result.data;
        dispatch({
          type: LOAD_REPLAY,
          payload: replayEndPointResponse.gameRecords
        });
        dispatch({
          type: LOAD_GAME_HISTORY_DATA,
          payload: [replayEndPointResponse.gameInfo]
        });
        dispatch({
          type: LOAD_TYPING,
          payload: replayEndPointResponse.gameTyping
        });
      });
  };
}

export function leaveGame() {
  return function(dispatch: any) {
    dispatch({
      type: LEAVE_GAME
    });
  };
}
