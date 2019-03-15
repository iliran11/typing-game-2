import * as io from 'socket.io';
import { BasePlayer } from './Player/players-index';

export default class PlayerManager {
  private static instance: PlayerManager;
  private players: Map<io.Socket | string, BasePlayer>;
  private constructor() {
    this.players = new Map();
  }
  addPlayer(player: BasePlayer): void {
    this.players.set(player.identifier, player);
  }
  getPlayer(socket: io.Socket): BasePlayer {
    // @ts-ignore
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
