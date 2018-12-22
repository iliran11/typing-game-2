import Letter from './store/classes/lettterData';
import GamesHistory from './pages/GamesHistory/GamesHistory';
export interface JoiningRoomResponse {
  roomId: number;
  players: PlayerSerialize[];
  letters: string[];
  roomSize: number;
  isGameActive: boolean;
  myId: string;
}
export interface PlayerSerialize {
  id: string;
  type: PlayerType;
  name: string;
  avatar: PlayerAvatar;
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
  avatar: PlayerAvatar;
}

export interface ResultGraphData extends PlayerClient {
  normalizedWpm: number;
  ranking: number;
}

export enum PlayerType {
  bot = 'BOT',
  human = 'HUMAN'
}
export enum Enviroments {
  LOCAL = 'LOCAL',
  DEV = 'DEV'
}
export enum LoginStatus {
  loggedIn = 'connected',
  loggedOut = 'logged-out',
  connecting = 'connecting'
}

export enum FbLoginStatus {
  connected = 'connected',
  authorizationExpired = 'authorization_expired',
  notAuthorized = 'not_authorized',
  unknown = 'unknown'
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
  finishedTimestamp: number | void = undefined;
  gameDuration: number | void = undefined;
  accuracy: number | void = undefined;

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
  readonly authentication: AuthReducer;
  readonly myData: MyDataReducer;
  readonly gamesHistory: IGamesHistoryReducer;
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

export interface AuthReducer {
  fbSdkLoaded: boolean;
  loggedIn: LoginStatus;
  facebookLoggedIn: boolean;
  facebookToken: string | null;
}
export interface MyDataReducer {
  facebookId: string;
  firstName: string;
  lastName: string;
}
export interface SdkLoadedSuccessAction {
  type: string;
}

// TODO: change to: CheckStatusResponse;
export interface LoginVerificationStatus {
  loginStatus: boolean;
  handshakeData: HandShakeData;
}
export interface LoginResponse {
  token: string;
  data: HandShakeData;
}

export interface FacebookStatusAction {
  loggedIn: boolean;
  token: string | null;
}
export interface FacebookUserType {
  id: string;
  firstName: string;
  lastName: string;
}
export interface GameModelInterface {
  letters: string[];
  players: PlayerSerialize[];
  _id: string;
  finalResults: {
    results: PlayerScore[];
  };
}

export interface PlayerAvatar {
  isAnonymous: boolean;
  picture: number | string;
}

export interface HandShakeData {
  facebookId: string;
  firstName: string;
  lastName: string;
}

export interface IGamesHistoryReducer {
  readonly gameHistories: GameModelInterface[];
  readonly isFetched: boolean;
}
