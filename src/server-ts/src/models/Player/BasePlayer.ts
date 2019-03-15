import * as io from 'socket.io';
import {
  PlayerAvatar,
  PlayerSerialize,
  PlayerType,
  RoomType
} from '../../../../types/typesIndex';
import Game from '../Game';
import { BaseRoom } from '../Room/BaseRoom';

export interface BasePlayersOptions {
  socket?: io.Socket | string;
  // userData?: FacebookUserType;
  level: number;
  room: BaseRoom;
}

export abstract class BasePlayer {
  static playerCounter: number = 1;
  protected game: Game;
  protected anonymousAvatar: number = -1;
  public hasLeft: boolean = false;
  public hasFinished: boolean = false;
  public room: BaseRoom;
  public abstract identifier;
  protected counterNumber: number;

  constructor(playerConstructorOptions: BasePlayersOptions) {
    const { socket, level, room } = playerConstructorOptions;
    this.room = room;
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
  get avatar(): PlayerAvatar {
    return { picture: this.anonymousAvatar, isAnonymous: true };
  }
  public onGameEnd() {
    this.room.playerHasFinished(this);
  }
  public get serializable(): PlayerSerialize {
    return {
      id: this.playerId,
      type: this.playerType,
      name: this.name,
      avatar: this.avatar
    };
  }
  public get playerGame() {
    return this.game;
  }
  setAvatar(avatarIndex: number) {
    this.anonymousAvatar = avatarIndex;
  }
  get playerId() {
    return `${this.counterNumber}`;
  }
  get roomId() {
    return this.room.instanceId;
  }
  get roomType() {
    return this.room.roomType;
  }
}
