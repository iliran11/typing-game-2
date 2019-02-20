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
  roomId: -1,
  isConnected: false,
  myId: '',
  playersGameStatus: {},
  isGameActive: false,
  roomSize: 0,
  gameStartTimestamp: 0,
  socketConnected: false,
  gameHasTimeout: false,
  initialSocketConnection: false,
  activeTypingTestRoomId: ''
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
    case LEAVE_GAME:
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
        socketConnected: true,
        initialSocketConnection: true
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
    case GAME_IS_ACTIVE:
      return {
        ...state,
        isGameActive: true
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
function gameRestart(
  state: ServerStatusReducer,
  action: any
): ServerStatusReducer {
  return initialState;
}

function otherPlayerJoining(
  state: ServerStatusReducer,
  action: PlayerJoiningAction
): ServerStatusReducer {
  return {
    ...state,
    // playersGameStatus: state.playersGameStatus.concat(action.payload)
    playersGameStatus: {
      ...state.playersGameStatus,
      [action.payload.playerId]: action.payload
    }
  };
}

function youJoinedRoom(
  state: ServerStatusReducer,
  action: any
): ServerStatusReducer {
  const { roomId = -1, players = {} } = action.payload;
  // transform array of players into mapped object.
  const playersGameStatus = action.payload.playersGameStatus.reduce(
    (accumulator: any, currentPlayerStatus: PlayerGameStatus) => {
      accumulator[currentPlayerStatus.playerId] = currentPlayerStatus;
      return accumulator;
    },
    {}
  );
  return {
    ...state,
    roomId,
    playersGameStatus,
    roomSize: action.payload.roomSize,
    isGameActive: action.payload.isGameActive,
    myId: action.payload.myId
  };
}

function scoreBroadCast(
  state: ServerStatusReducer,
  action: ScoreBroadcastAction
): ServerStatusReducer {
  const nextState = { ...state };
  action.payload.players.forEach((player: PlayerGameStatus) => {
    nextState.playersGameStatus[player.playerId] = player;
  });
  return nextState;
}

function typingTestActive(state: ServerStatusReducer, data: TypingGameInfoI) {
  return {
    ...state,
    activeTypingTestRoomId: data.instanceId
  };
}
