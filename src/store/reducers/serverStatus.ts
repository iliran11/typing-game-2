import { CONNECT_SERVER, YOU_JOINED_ROOM } from "../../constants";

interface ServerStatus {
  roomId: number;
  isConnected: boolean;
  myId: number;
  playersScore: any;
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
  myId: -1,
  playersScore: {}
};

export default function ServerStatus(state = initialState, action: any) {
  switch (action.type) {
    case CONNECT_SERVER:
      return {
        ...state,
        isConnected: true
      };
    case YOU_JOINED_ROOM:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}
