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
  RESTART_GAME
} from '../../constants';
import connectServerSuccess from './serverStatusHandlers/connectServerSuccess';
import youJoinedRoom from './serverStatusHandlers/youJoinedRoom';
import otherPlayerJoining from './serverStatusHandlers/otherPlayerJoining';
import scoreBroadcast from './serverStatusHandlers/scoreBroadCast';
import gameRestart from './serverStatusHandlers/gameRestart'

import {
  PlayerClient,
  PlayerSerialize,
  ServerStatusReducer
} from '../../types';

const initialState: ServerStatusReducer = {
  roomId: -1,
  isConnected: false,
  myId: '',
  players: [],
  isGameActive: false,
  roomSize: 0,
  gameStartTimestamp: 0
};

export default function ServerStatus(
  state: ServerStatusReducer = initialState,
  action: any
): ServerStatusReducer {
  switch (action.type) {
    case CONNECT_SERVER_SUCCESS:
      return connectServerSuccess(state, action);
    case YOU_JOINED_ROOM:
      return youJoinedRoom(state, action);
    case COMPETITOR_JOINED_ROOM:
    case BOT_JOINED_ROOM:
      return otherPlayerJoining(state, action);
    case SCORE_BROADCAST:
      return scoreBroadcast(state, action);
    case RESTART_GAME: 
      return gameRestart(state,action);
    case GAME_HAS_STARTED:
      return {
        ...state,
        isGameActive: true,
        gameStartTimestamp: action.payload
      };
    case COMPETITOR_DELETION:
    case COMPETITOR_LEFT:
      const nextState = { ...state };
      const nextPlayersArray = [...state.players];
      const indexOfLeavingPlayer = nextState.players.findIndex(
        (player: any) => {
          return player.id === action.payload.playerId;
        }
      );
      // if competitor left in the middle of the game - just mark him as not active.
      if (action.type === COMPETITOR_LEFT) {
        nextPlayersArray[indexOfLeavingPlayer].hasLeft = true;
        nextState.players = nextPlayersArray;
        return nextState;
        /**
         * else - competitor left before the game began. so he will be replaced in another player.
         * he will be deleted from the array of players in the server so a new player can be assigned.
         * we will delete him from the client array too.
         */
      } else {
        nextPlayersArray.splice(indexOfLeavingPlayer, 1);
        nextState.players = nextPlayersArray;
        return nextState;
      }
    case COMPETITOR_HAS_FINISHED:
      return onCompetitorFinish(state, action.payload);
    default:
      return state;
  }
}
// mark the finishing player as completed.
function onCompetitorFinish(
  state: ServerStatusReducer,
  payload: PlayerSerialize
): ServerStatusReducer {
  const nextState = { ...state };
  const nextPlayersArray = [...nextState.players];
  const finishedPlayer = nextPlayersArray.find((player: PlayerClient) => {
    return player.id === payload.id;
  });
  if (finishedPlayer) {
    finishedPlayer.isFinished = true;
  }
  nextState.players = nextPlayersArray;
  return nextState;
}
