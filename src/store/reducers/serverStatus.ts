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
  GAME_HAS_TIMEOUT,
  LEAVE_GAME,
  GAME_IS_ACTIVE,
  TYPING_TEST_IS_ACTIVE
} from '../../constants';
import {
  PlayerSerialize,
  ServerStatusReducer,
  ScoreBroadcastAction,
  PlayerJoiningAction,
  TypingGameInfoI
} from '../../types/typesIndex';
import { PlayerGameStatus } from '../../types/GameStatusType';

export const initialState: ServerStatusReducer = {
  isConnected: false,
  myId: '',
  socketConnected: false,
  gameHasTimeout: false,
  initialSocketConnection: false,
  activeRoomId: ''
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
    case SOCKET_HAS_CONNECTED:
      return {
        ...state,
        socketConnected: true,
        initialSocketConnection: true
      };
    case SOCKET_HAS_DISCONNECTED:
      return {
        ...state,
        socketConnected: false
      };
    case TYPING_TEST_IS_ACTIVE:
      return typingTestActive(state, action.payload);
    default:
      return state;
  }
}

function connectServerSuccess(state: ServerStatusReducer): ServerStatusReducer {
  return {
    ...state,
    isConnected: true
  };
}

function youJoinedRoom(
  state: ServerStatusReducer,
  action: any
): ServerStatusReducer {
  return {
    ...state,
    myId: action.payload.myId,
    activeRoomId: action.payload.roomId
  };
}

function typingTestActive(state: ServerStatusReducer, data: TypingGameInfoI) {
  return {
    ...state,
    activeTypingTestRoomId: data.instanceId
  };
}
