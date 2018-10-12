export interface JoiningRoomResponse {
  gameId: number;
  players: PlayerSerialize[];
  words: string[];
}

export interface PlayerSerialize {
  name: string;
  id: string;
}
