import Letter from './store/classes/lettterData';

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
  playerId: string;
  score: number;
  compeletedPercntage: number;
  type: PlayerType;
  hasLeft: boolean;
  isFinished: boolean;
  finishedTimestamp: number;
  gameDuration: number;
  accuracy: number;
}

export interface ResultGraphData extends PlayerClient {
  normalizedWpm: number;
  ranking: number;
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
  gameDuration: number | void;
  accuracy: number | void;

  constructor(playerId: string, score: number, completedPercntage: number) {
    this.playerId = playerId;
    this.score = score;
    this.completedPercntage = completedPercntage;
  }
}

export interface GameDataReducer {
  readonly letters: Letter[];
  readonly isGameFinished: boolean;
}

export interface ServerStatusReducer {
  readonly roomId: number;
  readonly isConnected: boolean;
  readonly myId: string;
  readonly players: PlayerClient[];
  readonly isGameActive: boolean;
  readonly roomSize: number;
  readonly gameStartTimestamp: number;
}
export interface RootState {
  readonly gameData: GameDataReducer;
  readonly serverStatus: ServerStatusReducer;
}

export interface ServerSuccessAction {
  type: string;
  payload: { myId: string };
}

export interface PlayerJoiningAction {
  type: string;
  payload: PlayerSerialize;
}

export interface ScoreBroadcastAction {
  type: string;
  payload: {
    players: any;
  };
}
