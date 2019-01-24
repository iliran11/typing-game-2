import { UserAchievmentsReducerI } from './types/AchievementsTypes';
import Letter from './store/classes/lettterData';
export interface JoiningRoomResponse {
  roomId: number;
  playersGameStatus: PlayerGameStatus[];
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
  LEVEL1 = 1,
  LEVEL2,
  LEVEL3,
  LEVEL4,
  LEVEL5
}

export enum Enviroments {
  LOCAL = 'LOCAL',
  STAGING = 'STAGING'
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
  numberOfTypings?: number;
  numberOfLetters?: number;
  numberOfWords?: number;
  rankAtFinish?: number;
  roomId: string;
  isAuthenticated: boolean;
}
// TODO: create a new type of object - finalizedGameStatus - where no optionals fields.
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
  numberOfTypings?: number;
  numberOfLetters?: number;
  numberOfWords?: number;
  rankAtFinish: number;
  roomId: string;
  isAuthenticated: boolean;

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
      name,
      numberOfTypings,
      numberOfLetters,
      numberOfWords,
      rankAtFinish,
      roomId,
      isAuthenticated
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
    this.numberOfTypings = numberOfTypings;
    this.numberOfWords = numberOfWords;
    this.numberOfLetters = numberOfLetters;
    this.rankAtFinish = rankAtFinish;
    this.roomId = roomId;
    this.isAuthenticated = isAuthenticated;
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
      name: this.name,
      numberOfTypings: this.numberOfTypings,
      numberOfWords: this.numberOfWords,
      numberOfLetters: this.numberOfLetters,
      rankAtFinish: this.rankAtFinish,
      roomId: this.roomId,
      isAuthenticated: this.isAuthenticated
    };
  }
}

export interface GameDataReducer {
  readonly letters: Letter[];
  readonly isGameFinished: boolean;
}
export interface NotificationsReducerI {
  notificationType: NotificationTypes;
}

export interface ServerStatusReducer {
  readonly roomId: number;
  readonly isConnected: boolean;
  readonly myId: string;
  readonly playersGameStatus: { [playerId: string]: PlayerGameStatus };
  readonly isGameActive: boolean;
  readonly roomSize: number;
  readonly gameStartTimestamp: number;
  readonly socketConnected: boolean;
  readonly gameHasTimeout: boolean;
  readonly initialSocketConnection: boolean;
}
export interface RootState {
  readonly gameData: GameDataReducer;
  readonly serverStatus: ServerStatusReducer;
  readonly authentication: AuthReducer;
  readonly myData: MyDataReducer;
  readonly gamesHistory: IGamesHistoryReducer;
  readonly replays: ReplayReducer;
  readonly typing: TypingReducerI;
  readonly userAchievments: UserAchievmentsReducerI;
  readonly highlights: HighlightsMapping;
  readonly notificationsManager: NotificationsReducerI;
}
export interface PlayerJoiningAction {
  type: string;
  payload: PlayerGameStatus;
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
  appToken: string;
  playerId: string;
}
export interface MyDataReducer {
  facebookId: string;
  firstName: string;
  lastName: string;
  level: number;
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
  appToken: string;
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
}

export interface ReplayEndPointResponseI {
  gameRecords: GameRecordsModel;
  gameInfo: GameModelInterface;
  gameTyping: TypingModelI[];
}

export interface PageProps {
  history: any;
}
export interface LevelRulesI {
  level: number;
  wpm: number;
  accuracy: number;
  totalWordsTyped: number;
  totalCharsTyped: number;
  text: string;
}

export interface HightLightItemI {
  roomId: string;
  data: PlayerGameStatus;
}

export interface HighlightsI {
  [highlightName: string]: HightLightItemI;
}

export interface HighlightsMapping {
  [playerId: string]: HighlightsI;
}

export interface PROMOTION_DATA {
  newLevel: number;
  nextObjectives: LevelRulesI;
}

export interface ChangeLevelPayload {
  playerId: string;
  level: number;
}

export enum NotificationTypes {
  NONE = 'none',
  LOGOUT_NOTIFICATION = 'logout-notification'
}
