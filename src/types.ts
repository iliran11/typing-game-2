export interface JoiningRoomResponse {
  roomId: number;
  players: PlayerSerialize[];
  letters: string[];
  roomSize: number;
  isGameActive: boolean;
}

export interface ServerConnectSuccessPayload {
  myId: string;
}

export interface PlayerSerialize {
  name: string;
  id: string;
}
export interface PlayerClient {
  id: string;
  name: string;
  score: number;
  compeletedPercntage:number;
}
