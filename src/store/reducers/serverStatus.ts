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

export default function ServerStatus(state = initialState) {
  return state;
}
