import Player from "./Player";
import * as io from "socket.io";
import sharedCode from "../../../client-server-code/client-server-code";
import ServerManager from "./ServerManager";

const {
  wpmScore,
  constants: { SCORES_BROADCAST }
} = sharedCode;

export default class Room {
  private static globalRoomCounter: number = 1;
  private maxPlayersInRoom: number = 2;
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
    player.createGame(this.roomId, this.gameWords);
    if (this.isRoomFull) {
      console.log(`${this.roomName} started.`);
      this.isClosed = true;
      this.startGame();
    }
  }
  deletePlayer(player: Player): void {
    if (this.isRoomFull) {
      clearTimeout(this.timerId);
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
        score: wpmScore(player.playerGame.gameObject.words, this.timePassedMinutes)
      };
    });
  }

  private gameTick(): void {
    this.timePassed += this.timeIncrement;
    const serverInstance = ServerManager.getInstance().serverObject;
    serverInstance.in(this.roomName).emit(SCORES_BROADCAST, this.scoresStats);
    // console.log(`${this.roomName}-tick!`);
  }
  private startGame(): void {
    const intervalTime: number = 1000;
    this.timerId = setInterval(this.gameTick.bind(this), intervalTime);
    // io.to(this.roomName)
  }
  private get timePassedMinutes(): number {
    return this.timePassed / 60000;
  }
  private endGame() {}
}
