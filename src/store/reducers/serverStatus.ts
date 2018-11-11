import {
  CONNECT_SERVER_SUCCESS,
  YOU_JOINED_ROOM,
  COMPETITOR_JOINED_ROOM,
  BOT_JOINED_ROOM,
  SCORE_BROADCAST,
  GAME_HAS_STARTED,
  COMPETITOR_LEFT,
  COMPETITOR_DELETION,
  COMPETITOR_HAS_FINISHED
} from '../../constants';

import { PlayerClient, PlayerSerialize } from '../../types';

interface ServerStatus {
  roomId: number;
  isConnected: boolean;
  myId: string;
  players: PlayerClient[];
  isGameActive: boolean;
  roomSize: number;
  gameStartTimestamp: number;
}
// interface PlayerScore {
//   playerId: string;
//   name: string;
//   score: number;
//   status: number;
// }

const initialState: ServerStatus = {
  roomId: -1,
  isConnected: false,
  myId: '',
  players: [],
  isGameActive: false,
  roomSize: 0,
  gameStartTimestamp: 0
};

export default function ServerStatus(
  state = initialState,
  action: any
): ServerStatus {
  const { payload: { roomId = -1, players = {} } = {} } = action;
  switch (action.type) {
    case CONNECT_SERVER_SUCCESS:
      return {
        ...state,
        isConnected: true,
        myId: action.payload.myId
      };
    case YOU_JOINED_ROOM:
      return {
        ...state,
        roomId,
        players,
        roomSize: action.payload.roomSize,
        isGameActive: action.payload.isGameActive
      };
    case COMPETITOR_JOINED_ROOM:
    case BOT_JOINED_ROOM:
      return {
        ...state,
        players: state.players.concat(action.payload)
      };
    case SCORE_BROADCAST:
      const nextPlayers = state.players.map(
        (player: PlayerClient, index: number) => {
          // TODO: implement PlayerScore type here like in the server.
          const {
            score,
            completedPercntage,
            finishedTimestamp,
            gameDuration,
            accuracy
          } = action.payload.players[index];
          player.score = score;
          player.compeletedPercntage = completedPercntage;
          player.finishedTimestamp = finishedTimestamp;
          player.gameDuration = gameDuration;
          player.accuracy = accuracy;
          return player;
        }
      );
      return {
        ...state,
        players: nextPlayers
      };
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
  state: ServerStatus,
  payload: PlayerSerialize
): ServerStatus {
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
