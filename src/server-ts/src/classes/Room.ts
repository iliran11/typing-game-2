import Player from './Player';
import BotPlayer from './BotPlayer';
import * as io from 'socket.io';
import ServerManager from './ServerManager';
import {
  SCORE_BROADCAST,
  MAX_PLAYERS_PER_ROOM,
  GAME_START_DELAY,
  BOT_SPAWN_RATE,
  GAME_HAS_STARTED,
  GAME_HAS_TIMEOUT,
  GAME_TIMEOUT_DURATION,
  NAVIGATE_RESULT
} from '../../../constants';
import { clearTimeout } from 'timers';
import PlayerManager from './PlayerManager';
import { allocateBotToRoom } from '../event-handlers/allocatePlayerToRoom';
import { PlayerType } from '../../../types';
import { PlayerGameStatus } from '../../../types/GameStatusType';
import { AchievementsProgressI } from '../../../types/AchievementsTypes';
import { emitToRoom } from '../utilities';
import { roomLogDb, userGameHistoryDb, roomSummaryDb } from '../mongoIndex';
import LevelManager from './LevelManager';
import { userPorgressDb } from '../mongo/AchievementsProgress/AchievementsProgress';
import { Countdown } from './Countdown';
var countBy = require('lodash.countby');
var isNil = require('lodash.isnil');
const random = require('lodash.random');
const uuid = require('uuid/v4');

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
  private finalScores: PlayerGameStatus[];
  public roomStartTimestamp: number = 0;
  private instanceId: string;
  private gameTickSequence: number;
  // store the already given avatar indexes so we can give anonymous player a unique avatar.
  private avatarIndexes: number = 0;
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
    this.timePassed = 0;
    this.addBot = this.addBot.bind(this);
    this.instanceId = `Room-${uuid()}`;
    if (MAX_PLAYERS_PER_ROOM > 1) {
      this.startCountdownBot();
    }
    this.gameTickSequence = 1;
  }
  addPlayer(player: Player): void {
    player.setAvatar(this.randomAvatarIndex);
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
    if(this.isRoomFull===false) {
      this.restartCountdownBot();
    }
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
      return player.playerGameStatus({
        timePassedMinutes: this.timePassedMinutes
      }).serialize;
    });
  }
  get isRoomFull(): boolean {
    return this.players.length === this.maxPlayersInRoom;
  }
  get roomName(): string {
    return `room-${this.roomId}`;
  }
  get gameRecord(): PlayerGameStatus[] {
    return this.players.map((player: Player, index: number) => {
      /** if the player has an entry of the final score index - it means he is finished.
       *  we will not re-calculate it. just retrieve it from the cached array.
       */
      return this.finalScores[index] || this.getPlayerScore(player);
    });
  }
  get currentRankOfFinishedPlayer(): number {
    const map = countBy(this.finalScores, value => {
      return isNil(value);
    });
    // false property represents the number of non-null values in finalcores.
    // if there is 1 non-null value in the array, it means one player already finished. so we are number 2 (hench the +1)
    return (map.false || 0) + 1;
  }
  async playerHasFinished(finishedPlayer: Player) {
    const playerIndex = this.players.findIndex((gamePlayer: Player) => {
      return gamePlayer.getName === finishedPlayer.getName;
    });
    const timestampNow = Date.now();
    //TODO: Unite with game status function.
    const {
      playerGame: { getRawLetters, numberOfTypings, numberOfWords }
    } = finishedPlayer;
    const gameResultRecord = finishedPlayer.playerGameStatus({
      timePassedMinutes: this.timePassedMinutes,
      finishedTimeStamp: this.roomStartTimestamp,
      gameDuration: timestampNow - this.roomStartTimestamp,
      accuracy: (getRawLetters.length / numberOfTypings) * 100,
      numberOfTypings: numberOfTypings,
      numberOfLetters: getRawLetters.length,
      numberOfWords: numberOfWords,
      rankAtFinish: this.currentRankOfFinishedPlayer,
      roomId: this.instanceId
    });
    this.finalScores[playerIndex] = gameResultRecord;
    if (finishedPlayer.isAuthenticated) {
      const stats = await LevelManager.getPlayerStats(finishedPlayer.playerId);
      const nextStats = LevelManager.calculateNextStats(
        stats,
        gameResultRecord
      );
      const playerProgress: AchievementsProgressI = {
        prevAchievement: stats,
        nextachievement: nextStats,
        roomId: this.roomInstanceId,
        timestamp: Date.now()
      };
      finishedPlayer.getSocket().emit(NAVIGATE_RESULT, playerProgress);
      userPorgressDb.createResult(playerProgress);
      userGameHistoryDb.save(gameResultRecord.serialize);
      await LevelManager.processNewResult(
        finishedPlayer.playerId,
        finishedPlayer.getSocket()
      );
    } else {
      finishedPlayer.getSocket().emit(NAVIGATE_RESULT);
    }
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

    return this.finalScores.some((playerGameStatus: PlayerGameStatus) => {
      return playerGameStatus == null;
    });
  }
  private getPlayerScore(player: Player): PlayerGameStatus {
    const currentPlayerStatus: PlayerGameStatus = player.playerGameStatus({
      timePassedMinutes: this.timePassedMinutes
    }).serialize;
    return currentPlayerStatus;
  }
  private get roomStatus(): PlayerGameStatus[] {
    return this.players.map((player: Player, index: number) => {
      /** if the player has an entry of the final score index - it means he is finished.
       *  we will not re-calculate it. just retrieve it from the cached array.
       */
      return this.finalScores[index] || this.getPlayerScore(player);
    });
  }
  private gameTick(): void {
    this.timePassed += this.timeIncrement;
    const roomLog: PlayerGameStatus[] = this.roomStatus;
    this.server.in(this.roomName).emit(SCORE_BROADCAST, roomLog);
    if (this.isAnyoneStillPlaying === false) {
      this.stopGame(roomLog);
    }
    if (this.timePassed > GAME_TIMEOUT_DURATION) {
      this.stopGame();
      emitToRoom(this.roomName, GAME_HAS_TIMEOUT);
    }
    roomLogDb.save(roomLog, this.instanceId, this.gameTickSequence);
    this.gameTickSequence++;
  }
  async startGame(): Promise<void> {
    // client still doesn't use the countdown socket being emmited to it.
    const countdown = new Countdown(this.roomName);
    await countdown.initiateCountdown();
    const intervalTime: number = 1000;
    this.timerId = setInterval(this.gameTick.bind(this), intervalTime);
    this.isClosed = true;
    this.stopCountdownBot();
    this.roomStartTimestamp = Date.now();
    emitToRoom(this.roomName, GAME_HAS_STARTED, {
      startTimeStamp: this.roomStartTimestamp
    });
    this.allBotPlayers.forEach((player: Player | BotPlayer) => {
      // @ts-ignore
      player.onGameStart();
    });
    roomSummaryDb.save({
      letters: this.players[0].playerGame.getRawLetters,
      players: this.playersInRoom,
      roomId: this.instanceId,
      finalResult: {
        results: this.finalScores
      }
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
    allocateBotToRoom(player.playerId, player, this);
    if (this.isGameActive) {
      this.startGame();
    }

    if (!this.isRoomFull) {
      this.restartCountdownBot();
    }
  }
  private stopGame(finalResult?: PlayerGameStatus[]) {
    clearTimeout(this.botRecruitTimer);
    clearTimeout(this.timerId);
    this.isClosed = true;
    console.log(`${this.roomName} has finished!`);
    //TODO: if there is no final result - delete or update accordingly this game on db.
    if (finalResult) {
      const finalResultDocument = roomLogDb.save(
        finalResult,
        this.instanceId,
        this.gameTickSequence
      );
      roomSummaryDb.updateById(this.instanceId, {
        finalResult: finalResultDocument
      });
    }
  }
  private get randomAvatarIndex(): number {
    return random(0, 11);
  }
  get roomTimePassed() {
    return this.timePassed;
  }
  get roomInstanceId() {
    return this.instanceId;
  }
}
