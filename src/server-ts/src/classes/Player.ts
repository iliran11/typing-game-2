import * as io from 'socket.io';
import Game from './Game';
import { PlayerSerialize } from '../../../types';
// import Game from "./Game";

export default class Player {
  static playerCounter: number = 1;
  private name: string;
  private socket: io.Socket;
  private game: Game;
  private roomId: number;

  // private game: Game;
  constructor(socket: io.Socket, name?) {
    this.socket = socket;
    if (name) {
      this.name = name;
    } else {
      this.name = this.guestName;
      Player.playerCounter++;
    }
  }
  createGame() {
    this.game = new Game();
  }
  private get guestName() {
    return `guest-${Player.playerCounter}`;
  }
  getSocket(): io.Socket {
    return this.socket;
  }
  public get serializable(): PlayerSerialize {
    return {
      name: this.name,
      id: this.name
    };
  }
  public get playerId(): string {
    return this.name;
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
}
