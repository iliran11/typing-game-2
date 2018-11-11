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
  id: string;
  type: PlayerType;
}
export interface PlayerClient {
  id: string;
  name: string;
  score: number;
  compeletedPercntage: number;
  type: PlayerType;
  hasLeft: boolean;
  isFinished:boolean;
  finishedTimestamp:number;
  gameDuration:number;
}

export enum PlayerType {
  bot = 'BOT',
  human = 'HUMAN'
}

export interface IPlayerScore {
  playerId: string;
  score: number;
  completedPercntage: number;
}

export class PlayerScore implements PlayerScore {
  playerId: string;
  score: number;
  completedPercntage: number;
  finishedTimestamp: number | void;
  gameDuration: number|void;

  constructor(playerId: string, score: number, completedPercntage: number) {
    this.playerId = playerId;
    this.score = score;
    this.completedPercntage = completedPercntage;
  }
}
