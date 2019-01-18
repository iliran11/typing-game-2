import * as io from 'socket.io';
import Game from './Game';
import {
  FacebookUserType,
  PlayerSerialize,
  PlayerType,
  PlayerAvatar,
  PlayerGameStatus,
  PlayerGameStatusFactory
} from '../../../types';
import { createUserInstance } from '../mongo/User/UserModel';
// import Game from "./Game ";

export default class Player {
  static playerCounter: number = 1;
  protected name: string;
  private id: string;
  private socket: io.Socket;
  private game: Game;
  private roomId: number = 0;
  private anonymousAvatar: number = -1;
  public isAuthenticated: boolean = false;
  private userDbModel: any;
  private currentLevel: number;

  // private game: Game;
  constructor(socket: io.Socket, userData: FacebookUserType, level: number) {
    this.socket = socket;
    this.name =
      (userData && `${userData.firstName} ${userData.lastName}`) ||
      `${this.serializable.type} ${Player.playerCounter}`;
    this.id =
      (userData && userData.id) ||
      `${this.serializable.type} ${Player.playerCounter}`;
    if (userData) {
      this.isAuthenticated = true;
      if (this.playerType !== 'BOT') {
        //@ts-ignore
        this.userDbModel = createUserInstance(userData);
      }
    }
    Player.playerCounter++;
    this.currentLevel = level;
    this.game = new Game(level);
  }
  createGame() {
    this.game = new Game(this.currentLevel);
  }
  public get playerType() {
    return PlayerType.human;
  }
  getSocket(): io.Socket {
    return this.socket;
  }
  public get getName() {
    return this.name;
  }
  public get avatar(): PlayerAvatar {
    if (!this.isAuthenticated) {
      return { picture: this.anonymousAvatar, isAnonymous: true };
    }
    return { picture: this.id, isAnonymous: false };
  }
  public get serializable(): PlayerSerialize {
    return {
      id: this.id,
      type: this.playerType,
      name: this.name,
      avatar: this.avatar
    };
  }
  public get playerId(): string {
    return this.id;
  }
  public get playerGame() {
    return this.game;
  }
  public get getRoomId(): number {
    return this.roomId;
  }
  public setRoomId(roomId): void {
    this.roomId = roomId;
  }
  setAvatar(avatarIndex: number) {
    this.anonymousAvatar = avatarIndex;
  }
  public setLevel(level: number) {
    this.currentLevel = level;
  }
  playerGameStatus(options: PlayerGameStatusI): PlayerGameStatusFactory {
    const {
      timePassedMinutes,
      finishedTimeStamp,
      gameDuration,
      accuracy,
      numberOfTypings,
      numberOfLetters,
      numberOfWords,
      rankAtFinish,
      roomId
    } = options;
    return new PlayerGameStatusFactory({
      id: this.id,
      score: this.playerGame.getWpmScore(timePassedMinutes),
      completedPercentage: this.playerGame.getPercentageComplete,
      type: this.playerType,
      hasLeft: false,
      isFinished: false,
      finishedTimeStamp,
      accuracy,
      gameDuration,
      name: this.serializable.name,
      numberOfTypings,
      numberOfLetters,
      numberOfWords,
      rankAtFinish,
      roomId,
      isAuthenticated: this.isAuthenticated
    });
  }
}

interface PlayerGameStatusI {
  timePassedMinutes: number;
  finishedTimeStamp?: number;
  gameDuration?: number;
  accuracy?: number;
  numberOfTypings?: number;
  numberOfLetters?: number;
  numberOfWords?: number;
  rankAtFinish?: number;
  roomId?: string;
}
