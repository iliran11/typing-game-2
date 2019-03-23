import { UserAchievmentsReducerI } from './types/AchievementsTypes';
import Letter from './store/classes/lettterData';
import {
  AchievementsProgressReducer,
  GameTypesAchivements
} from './types/AchievementsTypes';
import { GameSummryDBI } from './types/schemasTypes';
import { PlayerGameStatus } from './types/GameStatusType';
import { TypingTestInitGame } from './types/typingTestTypes';
export interface JoiningRoomResponse {
  roomId: string;
  playersGameStatus: PlayerGameStatus[];
  words: string[];
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
  STAGING = 'STAGING',
  TEST = 'TEST'
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
export interface GameDataReducer {
  readonly words: string[];
  readonly isGameFinished: boolean;
}
export interface NotificationsReducerI {
  notificationType: NotificationTypes;
}

export interface ServerStatusReducer {
  readonly isConnected: boolean;
  readonly myId: string;
  readonly socketConnected: boolean;
  readonly initialSocketConnection: boolean;
  readonly gameHasTimeout: boolean;
  readonly activeRoomId: string | null;
}
export interface MultiplayerRoomInfoI {
  readonly roomId: string;
  readonly playersGameStatus: { [playerId: string]: PlayerGameStatus };
  readonly isGameActive: boolean;
  readonly roomSize: number;
  readonly gameStartTimestamp: number;
}
export interface MultiplayerRoomMappingI {
  [roomId: string]: MultiplayerRoomInfoI;
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
  readonly achievementsProgress: AchievementsProgressReducer;
  readonly highlights: HighlightsMapping;
  readonly notificationsManager: NotificationsReducerI;
  readonly typingTest: TypingTestGamesMapping;
  readonly multiplayerMapping: MultiplayerRoomMappingI;
}
export interface PlayerJoiningAction {
  type: string;
  payload: PlayerGameStatus;
}

export interface ScoreBroadcastAction {
  type: string;
  payload: {
    players: PlayerGameStatus[];
    roomId: string;
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
  platform: DeviceType;
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
  readonly [gameId: string]: GameSummryDBI;
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
  challengeLetter: string;
  playerId: string;
  gameId: string;
  roomType: RoomType;
  gameTimeStamp: number;
  deviceType: DeviceType;
}

export interface ReplayEndPointResponseI {
  gameRecords: GameRecordsModel[];
  gameInfo: GameSummryDBI;
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

export interface HighlightsMapping {
  [playerId: string]: GameTypeHighlights;
}
export interface GameTypeHighlights {
  typingTest: PlatformsHighlights;
  multiplayer: PlatformsHighlights;
  playerId: string;
}

export interface PlatformsHighlights {
  mobile: HighlightsI;
  desktop: HighlightsI;
}
export interface HighlightsI {
  highestSpeed: HightLightItemI;
  firstPlace: HightLightItemI;
  fastestGame: HightLightItemI;
}
export interface TypingTestGamesMapping {
  [gameId: string]: TypingTestInitGame;
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
  LOGOUT_NOTIFICATION = 'logout-notification',
  GAME_TIMEOUT_NOTIFICATION = 'game-timeout-notification',
  SOCKET_DISCONNECT = 'socket-disconnected'
}

export enum RoomType {
  MULTIPLAYER = 'multiplayer',
  TYPING_TEST = 'typing-test'
}
export enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  UNKNOWN = 'unknown'
}

export interface MultiplayerRoomActive {
  roomId: string;
}

export interface RoomInfo {
  roomId: string;
  roomType: RoomType;
}

export interface GAME_IS_ACTIVE_PAYLOAD {
  roomId: string;
}
export interface ProfilePayload {
  achievements: GameTypesAchivements;
  highlights: GameTypeHighlights;
}
