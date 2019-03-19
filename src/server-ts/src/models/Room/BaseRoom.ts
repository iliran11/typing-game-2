import {
  COMPETITOR_DELETION,
  GAME_HAS_TIMEOUT,
  GAME_TIMEOUT_DURATION,
  MAX_PLAYERS_PER_ROOM,
  SCORE_BROADCAST
} from '../../../../constants';
import {
  GameSummryDBI,
  PlayerGameStatus,
  RoomType
} from '../../../../types/typesIndex';
import { logger, RoomPersonChange } from '../../middlewares/Logger';
import { emitToRoom } from '../../utilities';
import { BotPlayer } from '../Player/players-index';
import { BasePlayer } from '../Player/BasePlayer';
import ServerManager from '../ServerManager';
import { RoomPlayersManager } from './RoomPlayersManager';
import { roomSummaryDb } from '../../mongoIndex';
const uuid = require('uuid/v4');

// TODO: mark room has not-finished if all players left.

class BaseRoom {
  instanceId: string = `Room-${uuid()}`;
  intervalId: any;
  public readonly maxPlayersInRoom: number = MAX_PLAYERS_PER_ROOM;
  protected timePassed: number = 0;
  protected timerId: any;
  protected readonly timeIncrement: number = 1000;
  protected gameTickSequence: number = -1;
  protected roomPlayersManager: RoomPlayersManager = new RoomPlayersManager();
  protected enableTimeout: boolean = true;
  private finishedPlayersCount: number = 0;
  public isClosed: boolean = false;
  public roomType: RoomType;
  public isGameActive: boolean = false;
  public finalScores: { [playerId: string]: PlayerGameStatus } = {};

  public roomStartTimestamp: number = 0;

  constructor(roomType: RoomType) {
    this.roomType = roomType;
  }
  protected get passedTimeMinutes() {
    return this.timePassed / 60000;
  }
  get timeElapsed(): number {
    return this.timePassed;
  }
  get shouldSaveOnStop() {
    return true;
  }
  get isRoomFull() {
    return this.roomPlayersManager.playersMap.size >= this.maxPlayersInRoom;
  }
  get isAnyoneStillPlaying() {
    const result = this.roomPlayersManager.playersArray.some(player => {
      return !player.hasFinished;
    });
    return result;
  }
  get roomLetters() {
    return this.roomPlayersManager.playersArray[0].playerGame.getRawLetters;
  }
  get playersArray() {
    return this.roomPlayersManager.playersArray;
  }
  finishedPlayersCountIncrement() {
    this.finishedPlayersCount++;
  }

  /**
   * Scores methods
   */
  private sendScoreBoard() {
    this.server.in(this.roomName).emit(SCORE_BROADCAST, this.roomPlayersScores);
  }
  public get roomPlayersScores(): PlayerGameStatus[] {
    return this.roomPlayersManager.playersArray.map((player: BasePlayer) => {
      return this.getPlayerGameStatus(player);
    });
  }
  getPlayerGameStatus(player: BasePlayer): PlayerGameStatus {
    const game = player.playerGame;
    const rank = this.roomPlayersManager.playerRank(player);
    if (this.finalScores[player.playerId]) {
      return this.finalScores[player.playerId];
    }
    return {
      playerId: player.playerId,
      wpm: game.getWpmScore(),
      cpm: game.getCpmScore(),
      completedPercentage: game.getPercentageComplete,
      type: player.playerType,
      hasLeft: player.hasLeft,
      hasFinished: player.hasFinished,
      gameDuration: game.gameDuration,
      accuracy: game.getAccuracy(),
      avatar: player.avatar,
      numberOfTypings: game.numberOfTypings,
      numberOfLetters: game.getRawLetters.length,
      numberOfWords: game.words.length,
      rank: rank + 1,
      roomId: this.instanceId,
      isAuthenticated: player.isAuthenticated,
      roomType: this.roomType,
      name: player.name
    };
  }
  protected get server() {
    return ServerManager.getInstance().serverObject;
  }
  public get roomSummary(): GameSummryDBI {
    return {
      letters: this.roomLetters,
      players: this.roomPlayersScores,
      roomId: this.instanceId,
      roomType: this.roomType,
      finalResult: {
        results: this.roomPlayersScores
      },
      roomHasFinished: false
    };
  }
  playerHasFinished(player: BasePlayer) {
    player.hasFinished = true;
    this.finalScores[player.playerId] = this.getPlayerGameStatus(player);
    this.finishedPlayersCount++;
    roomSummaryDb.updatePlayerFinishedStatus(
      this.instanceId,
      player.playerId,
      true
    );
  }
  addPlayer(player: BasePlayer) {
    this.roomPlayersManager.addPlayer(player);
    logger.logRoomPersonChange(
      this.instanceId,
      player.playerId,
      RoomPersonChange.ENTERED
    );
  }
  startPlayerGames() {
    this.roomPlayersManager.playersMap.forEach((player: BasePlayer) => {
      if (player instanceof BotPlayer) {
        player.onGameStart();
      }
      player.playerGame.setStartTimestamp(this.roomStartTimestamp);
    });
  }
  startGame() {
    this.isGameActive = true;
    this.timerId = setInterval(this.gameTick.bind(this), this.timeIncrement);
    this.roomStartTimestamp = Date.now();
    this.startPlayerGames();
  }
  setGameIsActive() {
    this.isGameActive = true;
  }
  removePlayer(player: BasePlayer) {
    this.roomPlayersManager.removePlayer(player);
    this.server.in(this.roomName).emit(COMPETITOR_DELETION, {
      playerId: player.playerId,
      roomId: this.instanceId
    });
  }
  protected stopGame() {
    roomSummaryDb.updateRoomCompletion(this.instanceId, true);
    clearTimeout(this.timerId);
  }
  protected gameTick() {
    this.timePassed += this.timeIncrement;
    this.gameTickSequence++;
    this.sendScoreBoard();
    if (this.timePassed > GAME_TIMEOUT_DURATION && this.enableTimeout) {
      this.stopGame();
      emitToRoom(this.roomName, GAME_HAS_TIMEOUT, {
        roomId: this.instanceId
      });
    }
    if (this.finishedPlayersCount === this.roomPlayersManager.playersMap.size) {
      this.stopGame();
    }
  }
  public get roomName(): string {
    return this.instanceId;
  }
}

export { BaseRoom };
