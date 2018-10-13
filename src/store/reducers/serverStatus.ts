import { CONNECT_SERVER_SUCCESS, YOU_JOINED_ROOM,COMPETITOR_JOINED_ROOM } from "../../constants";

interface ServerStatus {
  roomId: number;
  isConnected: boolean;
  myId: string;
  players: any;
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
  players: {}
};

export default function ServerStatus(
  state = initialState,
  action: any
): ServerStatus {
  const { payload: { roomId = -1, players = {}, myId = -1 } = {} } = action;
  switch (action.type) {
    case CONNECT_SERVER_SUCCESS:
      return {
        ...state,
        isConnected: true,
        myId
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
        players: {
          ...state.players,
          [action.payload.id]: action.payload
        }
      }
    default:
      return state;
  }
}
