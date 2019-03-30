import * as io from 'socket.io';
import {
  PlayerAvatar,
  PlayerSerialize,
  PlayerType,
  RoomType,
  DeviceType
} from '../../../../types/typesIndex';
import Game from '../Game';
import { BaseRoom } from '../Room/BaseRoom';

export interface BasePlayersOptions {
  socket?: io.Socket | string;
  // userData?: FacebookUserType;
  room: BaseRoom;
  deviceType: DeviceType;
}

export abstract class BasePlayer {
  static playerCounter: number = 1;
  protected game: Game;
  protected anonymousAvatar: number = -1;
  public hasLeft: boolean = false;
  public hasFinished: boolean = false;
  public room: BaseRoom;
  abstract avatarUrl: string;
  protected counterNumber: number;
  deviceType: DeviceType;

  constructor(playerConstructorOptions: BasePlayersOptions) {
    const { socket, room } = playerConstructorOptions;
    this.room = room;
    this.deviceType = playerConstructorOptions.deviceType;
    const roomType = this.room.roomType;
    if (roomType === RoomType.MULTIPLAYER) {
      this.game = new Game(1, this);
    } else {
      this.game = new Game(99, this);
    }
    this.counterNumber = BasePlayer.playerCounter;
    BasePlayer.playerCounter++;
  }
  public abstract get isAuthenticated(): boolean;
  abstract get playerType(): PlayerType;
  get name() {
    return `${this.playerType} ${this.counterNumber}`;
  }
  public onGameEnd() {
    this.room.playerHasFinished(this);
  }
  public get serializable(): PlayerSerialize {
    return {
      id: this.playerId,
      type: this.playerType,
      name: this.name,
      avatar: { url: this.avatarUrl }
    };
  }
  public get playerGame() {
    return this.game;
  }
  get playerId() {
    return `${this.playerType} ${this.counterNumber}`;
  }
  get roomId() {
    return this.room.instanceId;
  }
  get roomType() {
    return this.room.roomType;
  }
  get avatar() {
    return { url: this.avatarUrl };
  }
}
