import {
  BOT_JOINED_ROOM,
  YOU_JOINED_ROOM,
  COMPETITOR_JOINED_ROOM,
  SCORE_BROADCAST,
  GAME_HAS_STARTED,
  GAME_IS_ACTIVE,
  COMPETITOR_DELETION
} from '../../constants';
import {
  PlayerJoiningAction,
  ScoreBroadcastAction,
  MultiplayerRoomMappingI,
  PlayerGameStatus,
  MultiplayerRoomActive
} from '../../types/typesIndex';

const initialState: MultiplayerRoomMappingI = {};

export function MultiplayerMappingReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case YOU_JOINED_ROOM:
      return youJoinedRoom(state, action);
    case COMPETITOR_JOINED_ROOM:
    case BOT_JOINED_ROOM:
      return otherPlayerJoining(state, action);
    case SCORE_BROADCAST:
      return scoreBroadCast(state, action);
    case GAME_HAS_STARTED:
      gameHasStarted(state, action.payload);
    case GAME_IS_ACTIVE:
      return gameIsActive(state, action.payload);
    case COMPETITOR_DELETION:
      return deleteCompetitor(state, action.payload);
    default:
      return state;
  }
}
function youJoinedRoom(
  state: MultiplayerRoomMappingI,
  action: any
): MultiplayerRoomMappingI {
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
    [roomId]: {
      roomId,
      playersGameStatus,
      roomSize: action.payload.roomSize,
      isGameActive: action.payload.isGameActive
    }
  };
}
function otherPlayerJoining(
  state: MultiplayerRoomMappingI,
  action: PlayerJoiningAction
): MultiplayerRoomMappingI {
  const roomId = action.payload.roomId;
  return {
    ...state,
    [roomId]: {
      ...state[roomId],
      playersGameStatus: {
        ...state[roomId].playersGameStatus,
        [action.payload.playerId]: action.payload
      }
    }
  };
}

function scoreBroadCast(
  state: MultiplayerRoomMappingI,
  action: ScoreBroadcastAction
): MultiplayerRoomMappingI {
  const roomId = action.payload.roomId;
  const nextState = { ...state };
  const nextRoom = { ...nextState[roomId] };
  nextState[roomId] = nextRoom;
  action.payload.players.forEach((player: PlayerGameStatus) => {
    nextRoom.playersGameStatus[player.playerId] = player;
  });
  return nextState;
}

function gameHasStarted(
  state: MultiplayerRoomMappingI,
  payload: any
): MultiplayerRoomMappingI {
  const roomId = payload.roomId;
  return {
    ...state,
    [roomId]: {
      ...state.roomId,
      isGameActive: true,
      gameStartTimestamp: payload.gameStartTimestamp
    }
  };
}

function gameIsActive(
  state: MultiplayerRoomMappingI,
  payload: MultiplayerRoomActive
): MultiplayerRoomMappingI {
  const roomId = payload.roomId;
  return {
    ...state,
    [roomId]: {
      ...state[roomId],
      isGameActive: true
    }
  };
}
function deleteCompetitor(
  state: MultiplayerRoomMappingI,
  payload: any
): MultiplayerRoomMappingI {
  const nextState = { ...state };
  const nextGame = { ...nextState[payload.roomId] };
  delete nextGame.playersGameStatus[payload.playerId];
  nextState[payload.roomId] = nextGame;
  return nextState;
}
