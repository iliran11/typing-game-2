import {
  CONNECT_SERVER_SUCCESS,
  LEAVE_GAME,
  SOCKET_HAS_CONNECTED,
  SOCKET_HAS_DISCONNECTED,
  TYPING_TEST_IS_ACTIVE,
  YOU_JOINED_ROOM
} from '../../constants';
import {
  ServerStatusReducer,
  TypingTestInitGame
} from '../../types/typesIndex';

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
    case LEAVE_GAME:
      return leaveGame(state);
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

function typingTestActive(
  state: ServerStatusReducer,
  data: TypingTestInitGame
) {
  return {
    ...state,
    activeRoomId: data.roomId
  };
}
function leaveGame(state: ServerStatusReducer): ServerStatusReducer {
  return { ...state, activeRoomId: null };
}
