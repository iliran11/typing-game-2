import * as io from "socket.io";
import Game from "./Game";
// import Game from "./Game";

export default class Player {
  private name: string;
  private socket: io.Socket;
  private game: any;
  private gameId: number;
  private words: string[];
  // private game: Game;
  constructor(socket: io.Socket) {
    this.socket = socket;
    this.name = "";
  }
  createGame(gameId: number, words: string[]) {
    this.gameId = gameId;
    this.game = new Game(gameId, words);
    this.words = words;
  }
  setName(name: string) {
    this.name = name;
  }
  getSocket(): io.Socket {
    return this.socket;
  }
  get serializable() {
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
