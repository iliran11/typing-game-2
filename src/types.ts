import Letter from './store/classes/lettterData';
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

export enum PlayerType {
  bot = 'BOT',
  human = 'HUMAN'
}

export enum GameLevel {
  LEVEL1 = 'level-1',
  LEVEL2 = 'level-2',
  LEVEL3 = 'level-3',
  LEVEL4 = 'level-4',
  LEVEL5 = 'level-5'
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
export interface PlayerGameStatus {
  id: string;
  score: number;
  completedPercentage: number;
  type: PlayerType;
  hasLeft: boolean;
  isFinished: boolean;
  finishedTimeStamp?: number;
  gameDuration?: number;
  accuracy?: number;
  avatar: PlayerAvatar;
  name: string;
}
export class PlayerGameStatusFactory implements PlayerGameStatus {
  id: string;
  score: number;
  completedPercentage: number;
  type: PlayerType;
  hasLeft: boolean;
  isFinished: boolean;
  finishedTimeStamp?: number;
  gameDuration?: number;
  accuracy?: number;
  avatar: PlayerAvatar;
  name: string;
  constructor(options: any) {
    const {
      id,
      score,
      completedPercentage,
      type,
      hasLeft,
      isFinished,
      finishedTimeStamp,
      gameDuration,
      accuracy,
      avatar,
      name
    } = options;
    this.id = id;
    this.score = score;
    this.completedPercentage = completedPercentage;
    this.type = type;
    this.hasLeft = hasLeft;
    this.isFinished = isFinished;
    this.finishedTimeStamp = finishedTimeStamp;
    this.gameDuration = gameDuration;
    this.accuracy = accuracy;
    this.avatar = avatar;
    this.name = name;
  }
  get serialize(): PlayerGameStatus {
    return {
      id: this.id,
      score: this.score,
      completedPercentage: this.completedPercentage,
      type: this.type,
      hasLeft: this.hasLeft,
      isFinished: this.isFinished,
      finishedTimeStamp: this.finishedTimeStamp,
      gameDuration: this.gameDuration,
      accuracy: this.accuracy,
      avatar: this.avatar,
      name: this.name
    };
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
  readonly players: PlayerSerialize[];
  readonly playersGameStatus: { [playerId: string]: PlayerGameStatus };
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
  readonly replays: ReplayReducer;
  readonly typing: TypingReducerI;
}
export interface PlayerJoiningAction {
  type: string;
  payload: PlayerSerialize;
}

export interface ScoreBroadcastAction {
  type: string;
  payload: {
    players: PlayerGameStatus[];
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
  finalResult: {
    results: PlayerGameStatus[];
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
  readonly [gameId: string]: GameModelInterface;
}

export interface GameRecordsModel {
  results: PlayerGameStatus[];
  gameInstanceId: string;
  _id: string;
}

export interface ReplayReducer {
  [roomId: string]: GameRecordsModel[];
}

//typing id is composed from roomId-playerId
export interface TypingReducerI {
  [typingId: string]: TypingModelI[];
}

export interface TypingModelI {
  typedLetter: string;
  playerId: string;
  gameId: string;
  gameTimeStamp: number;
  _id: string;
}

export interface ReplayEndPointResponseI {
  gameRecords: GameRecordsModel;
  gameInfo: GameModelInterface;
  gameTyping: TypingModelI[];
}

export interface PageProps {
  history: any;
}
