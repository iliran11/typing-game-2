import {
  GAME_TIMEOUT_DURATION,
  GAME_HAS_TIMEOUT,
  SCORE_BROADCAST,
  COMPETITOR_DELETION
} from '../../../../constants';
import {
  PlayerGameStatus,
  PlayerType,
  GameSummryDBI,
  RoomType
} from '../../../../types/typesIndex';
import Player from '../Player';
import BotPlayer from '../BotPlayer';
import { BotScheduler } from './BotScheduler';
import { emitToRoom } from '../../utilities';
const uuid = require('uuid/v4');
import { MAX_PLAYERS_PER_ROOM } from '../../../../constants';
import PlayerManager from '../PlayerManager';
import { multiplayerRoomManager } from '../MultiplayerRoomManager';
import { RoomPlayersManager } from './RoomPlayersManager';
import ServerManager from '../ServerManager';
import { logger, RoomPersonChange } from '../../middlewares/Logger';

class BaseRoom {
  instanceId: string = `Room-${uuid()}`;
  intervalId: any;
  public readonly maxPlayersInRoom: number = MAX_PLAYERS_PER_ROOM;
  protected timePassed: number = 0;
  protected timerId: any;
  protected timeIncrement: number = 1000;
  protected gameTickSequence: number = -1;
  protected roomPlayersManager: RoomPlayersManager = new RoomPlayersManager();
  protected botScheduler: BotScheduler;
  private finishedPlayersCount: number = 0;
  public isClosed: boolean = false;
  public roomType: RoomType;
  public isGameActive: boolean = false;

  public roomStartTimestamp: number = 0;

  constructor(roomType: RoomType) {
    this.addBot = this.addBot.bind(this);
    this.botScheduler = new BotScheduler(this.addBot);
    this.botScheduler.startCountdownBot();
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
  getPlayerGameStatus(player: Player | BotPlayer): PlayerGameStatus {
    const game = player.playerGame;
    const rank = this.roomPlayersManager.playerRank(player);
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
      name: player.getName
    };
  }
  protected get server() {
    return ServerManager.getInstance().serverObject;
  }
  public get roomPlayersScores(): PlayerGameStatus[] {
    return this.roomPlayersManager.playersArray.map(
      (player: Player | BotPlayer) => {
        return this.getPlayerGameStatus(player);
      }
    );
  }
  public get roomSummary(): GameSummryDBI {
    return {
      letters: this.roomLetters,
      players: this.roomPlayersScores,
      roomId: this.instanceId,
      roomType: this.roomType,
      finalResult: {
        results: this.roomPlayersScores
      }
    };
  }
  playerHasFinished(player: Player) {
    player.hasFinished = true;
    this.finishedPlayersCount++;
  }
  addPlayer(player: Player) {
    logger.logRoomPersonChange(
      this.instanceId,
      player.playerId,
      RoomPersonChange.ENTERED
    );
    this.roomPlayersManager.addPlayer(player);
    player.onGameEnd;
    // bot should wait X time after a human is joined. so if a human has joined - start counting again.
    if (this.isRoomFull) {
      this.startGame();
      this.isClosed = true;
    } else {
      this.botScheduler.restartCountdownBot();
    }
  }
  addBot() {
    const player = new BotPlayer({
      level: 99,
      roomType: this.roomType,
      // @ts-ignore
      room: this
    });
    PlayerManager.getInstance().addPlayer(player);
    multiplayerRoomManager.allocateToRoom(
      player.getSocket(),
      undefined,
      1,
      this.roomType,
      PlayerType.bot
    );
    if (this.roomPlayersManager.playersMap.size === this.maxPlayersInRoom) {
      this.botScheduler.stopCountDown();
    }
  }
  startPlayerGames() {
    this.roomPlayersManager.playersMap.forEach((player: Player) => {
      if (player instanceof BotPlayer) {
        player.onGameStart();
      }
      player.playerGame.setStartTimestamp(this.roomStartTimestamp);
    });
  }
  startGame() {
    this.isGameActive = true;
    this.botScheduler.stopCountDown();
    this.timerId = setInterval(this.gameTick.bind(this), this.timeIncrement);
    this.roomStartTimestamp = Date.now();
    this.startPlayerGames();
    this.onStartGame();
  }
  removePlayer(player: Player) {
    this.roomPlayersManager.removePlayer(player);
    this.server.in(this.roomName).emit(COMPETITOR_DELETION, {
      playerId: player.playerId,
      roomId: this.instanceId
    });
  }
  protected stopGame() {
    clearTimeout(this.timerId);
    this.onStopGame();
  }
  protected gameTick() {
    this.timePassed += this.timeIncrement;
    this.gameTickSequence++;
    this.server.in(this.roomName).emit(SCORE_BROADCAST, this.roomPlayersScores);
    if (this.timePassed > GAME_TIMEOUT_DURATION) {
      this.stopGame();
      emitToRoom(this.roomName, GAME_HAS_TIMEOUT, { roomId: this.instanceId });
    }
    if (this.finishedPlayersCount === this.roomPlayersManager.playersMap.size) {
      this.stopGame();
    }
  }
  public get roomName(): string {
    return `room-${this.instanceId}`;
  }
  protected onStartGame() {}
  protected onStopGame() {}
  protected onGameTick() {}
}

export { BaseRoom };
