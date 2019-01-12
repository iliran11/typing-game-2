import {
  CONNECT_SERVER_SUCCESS,
  YOU_JOINED_ROOM,
  COMPETITOR_JOINED_ROOM,
  BOT_JOINED_ROOM,
  SCORE_BROADCAST,
  GAME_HAS_STARTED,
  COMPETITOR_LEFT,
  COMPETITOR_DELETION,
  COMPETITOR_HAS_FINISHED,
  RESTART_GAME,
  SOCKET_HAS_CONNECTED,
  SOCKET_HAS_DISCONNECTED,
  GAME_HAS_TIMEOUT
} from '../../constants';
import connectServerSuccess from './serverStatusHandlers/connectServerSuccess';
import youJoinedRoom from './serverStatusHandlers/youJoinedRoom';
import otherPlayerJoining from './serverStatusHandlers/otherPlayerJoining';
import scoreBroadCast from './serverStatusHandlers/scoreBroadCast';
import gameRestart from './serverStatusHandlers/gameRestart';

import { PlayerSerialize, ServerStatusReducer } from '../../types';

export const initialState: ServerStatusReducer = {
  roomId: -1,
  isConnected: false,
  myId: '',
  players: [],
  playersGameStatus: {},
  isGameActive: false,
  roomSize: 0,
  gameStartTimestamp: 0,
  socketConnected: false,
  gameHasTimeout: false
};

export default function ServerStatus(
  state: ServerStatusReducer = initialState,
  action: any
): ServerStatusReducer {
  switch (action.type) {
    case CONNECT_SERVER_SUCCESS:
      return connectServerSuccess(state);
    case YOU_JOINED_ROOM:
      return youJoinedRoom(state, action);
    case COMPETITOR_JOINED_ROOM:
    case BOT_JOINED_ROOM:
      return otherPlayerJoining(state, action);
    case SCORE_BROADCAST:
      return scoreBroadCast(state, action);
    case RESTART_GAME:
      return gameRestart(state, action);
    case GAME_HAS_STARTED:
      return {
        ...state,
        isGameActive: true,
        gameStartTimestamp: action.payload
      };
    case SOCKET_HAS_CONNECTED:
      return {
        ...state,
        socketConnected: true
      };
    case SOCKET_HAS_DISCONNECTED:
      return {
        ...state,
        socketConnected: false
      };
    case GAME_HAS_TIMEOUT:
      return {
        ...state,
        isGameActive: false,
        gameHasTimeout: true
      };
    case COMPETITOR_DELETION:
      return state;
    case COMPETITOR_HAS_FINISHED:
      return state;
    default:
      return state;
  }
}
