export interface JoiningRoomResponse {
  roomId: number;
  players: PlayerSerialize[];
  words: string[];
}

export interface ServerConnectSuccessPayload {
  myId: string;
}

export interface PlayerSerialize {
  name: string;
  id: string;
}
