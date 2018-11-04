import Player from './Player';
import BotPlayer from './BotPlayer';
import * as io from 'socket.io';
import ServerManager from './ServerManager';
import {
  SCORE_BROADCAST,
  MAX_PLAYERS_PER_ROOM,
  GAME_START_DELAY,
  BOT_SPAWN_RATE
} from '../../../constants';
import { clearTimeout } from 'timers';
import PlayerManager from './PlayerManager';
import {
  allocatePlayerToRoom,
  broadcastCompetitorToRoom
} from '../event-handlers/allocatePlayerToRoom';
import { PlayerType } from '../../../types';

export default class Room {
  private static globalRoomCounter: number = 1;
  public readonly maxPlayersInRoom: number = MAX_PLAYERS_PER_ROOM;
  // time without any real player join - so we can add a bot.
  private players: (Player | BotPlayer)[];
  private gameWords: string[];
  // measure game length duration - not sure if needed.
  private timerId: any;
  private timePassed: number;
  private timeIncrement: number = 1000;
  private gameActive: boolean;
  isClosed: boolean;
  roomId: number;
  // time it takes for a bot to born
  botInterval = BOT_SPAWN_RATE;
  botRecruitTimer: any;

  constructor(words: string[]) {
    this.roomId = Room.globalRoomCounter;
    Room.globalRoomCounter++;
    this.players = [];
    this.gameWords = words;
    this.isClosed = false;
    // game timer start with negative value. becuase of countdown the clients gets when the game starts.
    this.timePassed = GAME_START_DELAY * 1000 * -1;
    this.gameActive = false;
    this.addBot = this.addBot.bind(this);
    this.startCountdownBot();
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
      console.log(`${this.roomName}- Game Stopped.`);
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
  get isGameActive() {
    return this.gameActive;
  }
  get allBotPlayers(): (Player | BotPlayer)[] {
    return this.players.filter((player: Player | BotPlayer) => {
      return player instanceof BotPlayer;
    });
  }
  get timeElapsed() {
    return this.timePassed
  }
  private get server() {
    return ServerManager.getInstance().serverObject;
  }
  private gameTick(): void {
    this.timePassed += this.timeIncrement;
    this.server.in(this.roomName).emit(SCORE_BROADCAST, this.scoresStats);
    // console.log(`${this.roomName}-tick!`);
  }
  private startGame(): void {
    const intervalTime: number = 1000;
    this.timerId = setInterval(this.gameTick.bind(this), intervalTime);
    this.gameActive = true;
  }
  private get timePassedMinutes(): number {
    return ((this.timePassed) / 60000) ;
  }
  // initiate a countdown for adding a bot
  private startCountdownBot(): void {
    this.botRecruitTimer = setTimeout(this.addBot, this.botInterval);
  }
  // restart the countdown.
  private restartCountdownBot(): void {
    clearTimeout(this.botRecruitTimer);
    this.startCountdownBot();
  }
  // stop the countdown completely - for now - when the room is full and no longer in need for players.n
  private stopCountdownBot(): void {
    clearTimeout(this.botRecruitTimer);
  }
  // add bot to this room if no human player is joining in X time.
  private addBot(): void {
    const botPlayerId = BotPlayer.getNextBotId();
    const player = new BotPlayer(botPlayerId);
    PlayerManager.getInstance().addPlayer(player);
    allocatePlayerToRoom(player.playerId);
    broadcastCompetitorToRoom(player, this, null);

    if (!this.isRoomFull) {
      this.restartCountdownBot();
    }
  }
}
