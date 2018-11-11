import * as io from 'socket.io';
import Game from './Game';
import { PlayerSerialize, PlayerType } from '../../../types';
// import Game from "./Game";

export default class Player {
  static playerCounter: number = 1;
  protected name: string;
  private socket: io.Socket;
  private game: Game;
  private roomId: number;

  // private game: Game;
  constructor(socket: io.Socket, name?) {
    this.socket = socket;
    this.name = `${this.serializable.type} ${Player.playerCounter}`;
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
      type: this.playerType
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
