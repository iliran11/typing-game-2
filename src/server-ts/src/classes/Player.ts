import * as io from "socket.io";
import Game from "./Game";
import { PlayerSerialize } from "../../../types";
// import Game from "./Game";

export default class Player {
  static playerCounter: number = 1;
  private name: string;
  private socket: io.Socket;
  private game: any;
  private gameId: number;
  private words: string[];
  // private game: Game;
  constructor(socket: io.Socket, name?) {
    this.socket = socket;
    if (name) {
      this.name = name;
    } else {
      this.name = this.guestName;
      Player.playerCounter++;
    }
    this.name = name ? name : this.guestName;
  }
  createGame(gameId: number, words: string[]) {
    this.gameId = gameId;
    this.game = new Game(gameId);
    this.words = words;
  }
  private get guestName() {
    return `guest - ${Player.playerCounter}`;
  }
  getSocket(): io.Socket {
    return this.socket;
  }
  get serializable(): PlayerSerialize {
    return {
      name: this.name,
      id: this.name
    };
  }
  get playerId(): string {
    return this.name;
  }
  get roomId(): number {
    return this.gameId;
  }
  get gameWords(): string[] {
    return this.words;
  }
  get playerGame() {
    return this.game;
  }
}
