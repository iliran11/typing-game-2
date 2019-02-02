import * as socketIo from 'socket.io-client';
import {
  JoiningRoomResponse,
  PlayerSerialize,
  PlayerType,
  PlayerJoiningAction,
  ScoreBroadcastAction,
  Enviroments,
  RoomType
} from './types';
import { PlayerGameStatus } from './types/GameStatusType';
import { AchievementsProgressI } from './types/AchievementsTypes';
import {
  LOAD_ACHIEVEMENT_PROGRESS,
  YOU_JOINED_ROOM,
  CONNECT_SERVER_SUCCESS,
  COMPETITOR_JOINED_ROOM,
  BOT_JOINED_ROOM,
  PLAYER_TYPING,
  SET_GAME_LETTERS,
  SCORE_BROADCAST,
  GAME_HAS_STARTED,
  COMPETITOR_LEFT,
  COMPETITOR_DELETION,
  GAME_HAS_FINISHED,
  COMPETITOR_HAS_FINISHED,
  RESTART_GAME,
  SHOW_NOTIFICATION,
  SOCKET_HAS_CONNECTED,
  SOCKET_HAS_DISCONNECTED,
  REQUEST_TO_PLAY,
  GAME_HAS_TIMEOUT,
  NAVIGATE_RESULT
} from './constants';
import AuthenticationManager from './AuthenticationManager';

const socketManager: any = {
  initSocket(dispatch: any, history: any) {
    // this.socket = socketIo.connect('http://localhost:4001');
    this.dispatch = dispatch;
    this.history = history;
    const url = getServerUrl();
    const token = AuthenticationManager.appToken || null;
    const query = token ? { token } : {};
    this.socket = socketIo.connect(
      url,
      {
        query,
        reconnection: false
      }
    );
    this.socket.on('error', () => {
      console.log('error!!!');
    });
    this.socket.on('connect', () => {
      this.dispatch({
        type: SOCKET_HAS_CONNECTED
      });
    });
    this.socket.on('connect_timeout', () => {
      console.log('connect timeout!');
    });
    this.socket.on('disconnect', () => {
      this.dispatch({
        type: SOCKET_HAS_DISCONNECTED
      });
    });
    this.socket.on(YOU_JOINED_ROOM, (data: JoiningRoomResponse) => {
      const { roomId, playersGameStatus, roomSize, isGameActive, myId } = data;
      this.dispatch({
        type: YOU_JOINED_ROOM,
        payload: {
          roomId,
          playersGameStatus,
          roomSize,
          isGameActive,
          myId
        }
      });
      this.dispatch({
        type: SET_GAME_LETTERS,
        payload: {
          letters: data.letters
        }
      });
    });
    this.socket.on(COMPETITOR_JOINED_ROOM, (playerObject: PlayerGameStatus) => {
      const type =
        playerObject.type === PlayerType.human
          ? COMPETITOR_JOINED_ROOM
          : BOT_JOINED_ROOM;
      const action: PlayerJoiningAction = {
        type,
        payload: { ...playerObject }
      };
      this.dispatch(action);
    });
    this.socket.on(GAME_HAS_STARTED, (payload: any) => {
      const action = {
        type: GAME_HAS_STARTED,
        payload: {
          gameStartTimestamp: payload.startTimeStamp
        }
      };
      this.dispatch(action);
    });
    this.socket.on(SCORE_BROADCAST, (data: any) => {
      const action: ScoreBroadcastAction = {
        type: SCORE_BROADCAST,
        payload: {
          players: data
        }
      };
      this.dispatch(action);
    });
    this.socket.on(COMPETITOR_LEFT, (data: PlayerSerialize) => {
      this.dispatch(handleCompetitorleave(data));
    });
    this.socket.on(COMPETITOR_HAS_FINISHED, (data: PlayerSerialize) => {
      this.dispatch({
        type: COMPETITOR_HAS_FINISHED,
        payload: data
      });
    });
    this.socket.on(GAME_HAS_TIMEOUT, () => {
      this.dispatch({
        type: GAME_HAS_TIMEOUT
      });
    });
    this.socket.on(NAVIGATE_RESULT, (data: AchievementsProgressI) => {
      this.dispatch({
        type: LOAD_ACHIEVEMENT_PROGRESS,
        payload: data
      });
      window.setTimeout(() => {
        this.history.push(`/achievements-progress/?room-id=${data.roomId}`);
      }, 2000);
    });
  },

  emitTyping(typingInput: string) {
    this.socket.emit(PLAYER_TYPING, { typingInput });
  },
  emitFinishedGame() {
    this.socket.emit(GAME_HAS_FINISHED);
  },
  emitRequestToPlay(roomType: RoomType) {
    this.socket.emit(REQUEST_TO_PLAY, roomType);
  },
  emitGameRestart() {
    this.socket.emit(RESTART_GAME);
  },
  close() {
    this.socket.close();
  }
};

function handleCompetitorleave(data: any) {
  return function(dispatch: any, getState: any) {
    const state = getState();
    if (state.serverStatus.isGameActive) {
      dispatch({
        type: COMPETITOR_LEFT,
        payload: {
          playerId: data.id
        }
      });
    } else {
      dispatch({
        type: COMPETITOR_DELETION,
        payload: {
          playerId: data.id
        }
      });
    }
  };
}

export default socketManager;

function getServerUrl() {
  if (process.env.REACT_APP_ENV === Enviroments.LOCAL) {
    return 'http://localhost:4001';
  }
  if (process.env.REACT_APP_ENV === Enviroments.STAGING) {
    return 'https://typing-dev-2.herokuapp.com/';
  }
  return '';
}
