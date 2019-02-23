import * as io from 'socket.io';
import Game from './Game';
import {
  FacebookUserType,
  PlayerSerialize,
  PlayerType,
  PlayerAvatar,
  RoomType
} from '../../../types/typesIndex';

import { PlayerGameStatus } from '../../../types/GameStatusType';
import { createUserInstance } from '../mongo/User/UserModel';
import { Socket } from 'dgram';
// import Game from "./Game ";

export interface PlayerConstructorOptions {
  socket?: io.Socket | string;
  userData?: FacebookUserType;
  level: number;
  roomType: RoomType;
}

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
  constructor(playerConstructorOptions: PlayerConstructorOptions) {
    const { socket, userData, level, roomType } = playerConstructorOptions;
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
    if (roomType === RoomType.MULTIPLAYER) {
      this.game = new Game(level);
    } else {
      this.game = new Game(99);
    }
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
}
