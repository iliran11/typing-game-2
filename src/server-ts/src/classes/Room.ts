import Player from "./Player";
import * as io from "socket.io";
import ServerManager from "./ServerManager";
import { SCORE_BROADCAST, MAX_PLAYERS_PER_ROOM,GAME_HAS_STARTED } from "../../../constants";

export default class Room {
  private static globalRoomCounter: number = 1;
  public readonly maxPlayersInRoom: number = MAX_PLAYERS_PER_ROOM;
  private players: Player[];
  private gameWords: string[];
  private timerId: any;
  private timePassed: number;
  private timeIncrement: number;
  isClosed: boolean;
  roomId: number;

  constructor(words: string[]) {
    this.roomId = Room.globalRoomCounter;
    Room.globalRoomCounter++;
    this.players = [];
    this.gameWords = words;
    this.isClosed = false;
    this.timePassed = 0;
    this.timeIncrement = 1000;
  }
  addPlayer(player: Player): void {
    this.players.push(player);
    player.createGame();
    console.log(
      `${player.playerId} Joined ${this.roomName}. Capacity: ${
        this.playersInRoom.length
      }/${this.maxPlayersInRoom}`
    );
    if (this.isRoomFull) {
      this.isClosed = true;
      this.startGame();
    }
  }
  deletePlayer(player: Player): void {
    if (this.isRoomFull) {
      clearTimeout(this.timerId);
      console.log(`${this.roomName}- Game Stopped.`)
    }
    const index = this.getPlayerIndex(player.playerId);
    this.players.splice(index, 1);
  }
  private getPlayerIndex(playerId: string): number {
    return this.players.findIndex((player: Player) => {
      return player.playerId === playerId;
    });
  }
  get playersInRoom() {
    return this.players.map((player: Player) => {
      return player.serializable;
    });
  }
  get isRoomFull(): boolean {
    return this.players.length === this.maxPlayersInRoom;
  }
  get roomName(): string {
    return `room-${this.roomId}`;
  }
  get scoresStats() {
    return this.players.map((player: Player) => {
      return {
        playerId: player.playerId,
        score: player.playerGame.getWpmScore(this.timePassedMinutes),
        completedPercntage: player.playerGame.getPercentageComplete
      };
    });
  }
  private get server() {
    return ServerManager.getInstance().serverObject
  }
  private gameTick(): void {
    this.timePassed += this.timeIncrement;
    this.server.in(this.roomName).emit(SCORE_BROADCAST, this.scoresStats);
    // console.log(`${this.roomName}-tick!`);
  }
  private startGame(): void {
    const intervalTime: number = 1000;
    this.timerId = setInterval(this.gameTick.bind(this), intervalTime);
    this.server.in(this.roomName).emit(GAME_HAS_STARTED);
    console.log(`${this.roomName}-Game started.`)
    // io.to(this.roomName)
  }
  private get timePassedMinutes(): number {
    return this.timePassed / 60000;
  }
  private endGame() {}
}
