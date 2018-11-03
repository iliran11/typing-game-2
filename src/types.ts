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
  type: PlayerType
}
export interface PlayerClient {
  id: string;
  name: string;
  score: number;
  compeletedPercntage: number;
  type: PlayerType;
}

export enum PlayerType {
  bot = "BOT",
  human = "HUMAN"
}
