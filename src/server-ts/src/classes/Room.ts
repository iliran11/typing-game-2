import Player from './Player';
import BotPlayer from './BotPlayer';
import * as io from 'socket.io';
import ServerManager from './ServerManager';
import {
  SCORE_BROADCAST,
  MAX_PLAYERS_PER_ROOM,
  GAME_START_DELAY,
  BOT_SPAWN_RATE,
  GAME_HAS_STARTED
} from '../../../constants';
import { clearTimeout } from 'timers';
import PlayerManager from './PlayerManager';
import {
  allocatePlayerToRoom,
  broadcastCompetitorToRoom
} from '../event-handlers/allocatePlayerToRoom';
import { PlayerScore, PlayerType } from '../../../types';
import { emitToRoom } from '../utilities';

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
  private finalScores: (void | PlayerScore)[];
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
    // closed for new players additions. i.e - game has started.
    this.isClosed = false;
    this.finalScores = new Array(MAX_PLAYERS_PER_ROOM).fill(null);
    // game timer start with negative value. becuase of countdown the clients gets when the game starts.
    this.timePassed = GAME_START_DELAY * 1000 * -1;
    this.addBot = this.addBot.bind(this);
    if (MAX_PLAYERS_PER_ROOM > 1) {
      this.startCountdownBot();
    }
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
    }
    // bot should wait X time after a human is joined. so if a human has joined - start counting again.
    this.restartCountdownBot();
  }
  deletePlayer(player: Player): void {
    if (this.isThereHuman === false) {
      this.stopGame();
      // TODO: implement tracking of human players in the room. when we have 0 human players, stop the game.
      // clearTimeout(this.timerId);
      // console.log(`${this.roomName}- Game Stopped.`);
    }
    const index = this.getPlayerIndex(player.playerId);
    this.players.splice(index, 1);
  }
  private get isThereHuman(): boolean {
    return this.players.some((player: Player) => {
      return player.playerType === PlayerType.human;
    });
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
  get scoresStats(): PlayerScore[] {
    return this.players.map((player: Player, index: number) => {
      /** if the player has an entry of the final score index - it means he is finished.
       *  we will not re-calculate it. just retrieve it from the cached array.
       */
      return this.finalScores[index] || this.getPlayerScore(player);
    });
  }
  private getPlayerScore(player: Player) {
    const playerId = player.playerId;
    const score = player.playerGame.getWpmScore(this.timePassedMinutes);
    const completedPercntage = player.playerGame.getPercentageComplete;
    return new PlayerScore(playerId, score, completedPercntage);
  }
  playerHasFinished(finishedPlayer: Player) {
    const playerIndex = this.players.findIndex((gamePlayer: Player) => {
      return gamePlayer.getName === finishedPlayer.getName;
    });
    this.finalScores[playerIndex] = this.getPlayerScore(finishedPlayer);
  }
  get isGameActive() {
    return this.players.length === MAX_PLAYERS_PER_ROOM;
  }
  get allBotPlayers(): (Player | BotPlayer)[] {
    return this.players.filter((player: Player | BotPlayer) => {
      return player instanceof BotPlayer;
    });
  }
  get timeElapsed() {
    return this.timePassed;
  }
  private get server() {
    return ServerManager.getInstance().serverObject;
  }
  private get isAnyoneStillPlaying(): boolean {
    /* if we encounter 'null' value in the final scores array
     *  it means someone is still typing. in this case we shouldn't stop the game tick yet.
     */

    return this.finalScores.some((score: PlayerScore) => {
      return score == null;
    });
  }
  private gameTick(): void {
    this.timePassed += this.timeIncrement;
    this.server.in(this.roomName).emit(SCORE_BROADCAST, this.scoresStats);
    if (this.isAnyoneStillPlaying === false) {
      this.stopGame();
    }
    // console.log(`${this.roomName}-tick!`);
  }
  startGame(): void {
    const intervalTime: number = 1000;
    this.timerId = setInterval(this.gameTick.bind(this), intervalTime);
    this.isClosed = true;
    this.stopCountdownBot();
    emitToRoom(this.roomName, GAME_HAS_STARTED);
    this.allBotPlayers.forEach((player: BotPlayer) => {
      player.onGameStart();
    });
    console.log(`${this.roomName}-Game started.`);
  }
  private get timePassedMinutes(): number {
    return this.timePassed / 60000;
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
    if (this.isGameActive) {
      this.startGame();
    }

    if (!this.isRoomFull) {
      this.restartCountdownBot();
    }
  }
  private stopGame() {
    clearTimeout(this.botRecruitTimer);
    clearTimeout(this.timerId);
    this.isClosed = true;
    console.log(`${this.roomName} has finished!`)
  }
}
