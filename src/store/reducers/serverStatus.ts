import {
  CONNECT_SERVER_SUCCESS,
  YOU_JOINED_ROOM,
  COMPETITOR_JOINED_ROOM,
  SCORE_BROADCAST
} from "../../constants";

import { PlayerClient } from "../../types";

interface ServerStatus {
  roomId: number;
  isConnected: boolean;
  myId: string;
  players: PlayerClient[];
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
  myId: "",
  players: []
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
        players
      };
    case COMPETITOR_JOINED_ROOM:
      return {
        ...state,
        players: state.players.concat(action.payload)
      };
    case SCORE_BROADCAST:
      const nextPlayers = state.players.map(
        (player: PlayerClient, index: number) => {
          player.score = action.payload.players[index].score;
          return player;
        }
      );
      return {
        ...state,
        players: nextPlayers
      };
    default:
      return state;
  }
}
