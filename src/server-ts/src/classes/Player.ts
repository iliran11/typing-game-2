import * as io from 'socket.io';
import Game from './Game';
import { PlayerSerialize, PlayerType } from '../../../types';
// import Game from "./Game";

export default class Player {
  static playerCounter: number = 1;
  protected name: string;
  private id: string;
  private socket: io.Socket;
  private game: Game = new Game();
  private roomId: number = 0;
  private anonymousAvatar: number = -1;

  // private game: Game;
  constructor(socket: io.Socket, name?, id?) {
    this.socket = socket;
    this.name = name || `${this.serializable.type} ${Player.playerCounter}`;
    this.id = id || `${this.serializable.type} ${Player.playerCounter}`;
    Player.playerCounter++;
  }
  createGame() {
    this.game = new Game();
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
  public get serializable(): PlayerSerialize {
    return {
      id: this.name,
      type: this.playerType,
      avatar: this.anonymousAvatar
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
  get Avatar() {
    return this.anonymousAvatar;
  }
  setAvatar(avatarIndex: number) {
    this.anonymousAvatar = avatarIndex;
  }
}
