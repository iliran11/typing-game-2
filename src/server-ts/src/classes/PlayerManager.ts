import * as io from "socket.io";
import Player from "./Player";

export default class PlayerManager {
  private static instance: PlayerManager;
  private players: Map<io.Socket, Player>;
  private constructor() {
    this.players = new Map();
  }
  addPlayer(player: Player): void {
    this.players.set(player.getSocket(), player);
  }
  getPlayer(socket: io.Socket): Player {
    return this.players.get(socket);
  }
  deletePlayer(socket: io.Socket): void {
    this.players.delete(socket);
  }
  static getInstance() {
    if (!PlayerManager.instance) {
      PlayerManager.instance = new PlayerManager();
    }
    return PlayerManager.instance;
  }
}
