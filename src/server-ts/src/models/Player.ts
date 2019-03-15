import * as io from 'socket.io';
import Game from './Game';
import {
  FacebookUserType,
  PlayerSerialize,
  PlayerType,
  PlayerAvatar,
  RoomType
} from '../../../types/typesIndex';
import MultiplayerRoom from './Room/MultiplayerRoom';
import { TypingTestRoom } from './Room/TypingTestRoom';

import { createUserInstance } from '../mongo/User/UserModel';

export interface PlayerConstructorOptions {
  socket?: io.Socket | string;
  userData?: FacebookUserType;
  level: number;
  roomType: RoomType;
  room: MultiplayerRoom | TypingTestRoom;
}

export default class Player {
  static playerCounter: number = 1;
  protected name: string;
  private id: string;
  private socket: io.Socket;
  private game: Game;
  private anonymousAvatar: number = -1;
  public roomId: string;
  public isAuthenticated: boolean = false;
  public hasLeft: boolean = false;
  public hasFinished: boolean = false;
  public room: any;
  public roomType: RoomType;
  public currentLevel: number;

  // private game: Game;
  constructor(playerConstructorOptions: PlayerConstructorOptions) {
    const {
      socket,
      userData,
      level,
      roomType,
      room
    } = playerConstructorOptions;
    this.room = room;
    this.socket = socket;
    this.roomType = roomType;
    this.roomId = room.instanceId;
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
      this.game = new Game(level, this);
    } else {
      this.game = new Game(99, this);
    }
    this.onGameEnd = this.onGameEnd.bind(this);
  }
  public get playerType() {
    return PlayerType.human;
  }
  onGameEnd() {
    this.room.playerHasFinished(this);
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
