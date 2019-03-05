import { GAME_HAS_STARTED, NAVIGATE_RESULT } from '../../../../constants';
import {
  AchievementsProgressI,
  PlayerGameStatus,
  PlayerType,
  RoomType
} from '../../../../types/typesIndex';
import { roomLogDb, roomSummaryDb, userGameHistoryDb } from '../../mongoIndex';
import { emitToRoom } from '../../utilities';
import BotPlayer from '../BotPlayer';
import { Countdown } from '../Countdown';
import LevelManager from '../LevelManager';
import { multiplayerRoomManager } from '../MultiplayerRoomManager';
import Player from '../Player';
import PlayerManager from '../PlayerManager';
import { BaseRoom } from './BaseRoom';
import { BotScheduler } from './BotScheduler';
const random = require('lodash.random');

export default class MultiplayerRoom extends BaseRoom {
  // measure game length duration - not sure if needed.
  private avatarIndexes: number = 0;
  protected botScheduler: BotScheduler;
  constructor(roomType: RoomType) {
    super(roomType);
    this.addBot = this.addBot.bind(this);
    this.botScheduler = new BotScheduler(this.addBot);
    this.botScheduler.startCountdownBot();
  }
  addPlayer(player: Player): void {
    super.addPlayer(player);
    player.setAvatar(this.randomAvatarIndex);
    // bot should wait X time after a human is joined. so if a human has joined - start counting again.
    if (this.isRoomFull) {
      this.startGame();
      super.isClosed = true;
    } else {
      this.botScheduler.restartCountdownBot();
    }
  }
  deletePlayer(player: Player): void {}
  async onPlayerHasFinished(finishedPlayer: Player) {
    super.playerHasFinished(finishedPlayer);
    const gameResultRecord = super.getPlayerGameStatus(finishedPlayer);
    if (finishedPlayer.isAuthenticated) {
      const stats = await LevelManager.getPlayerStats(finishedPlayer.playerId);
      const nextStats = LevelManager.calculateNextStats(
        stats,
        gameResultRecord
      );
      const playerProgress: AchievementsProgressI = {
        prevAchievement: stats,
        nextachievement: nextStats,
        roomId: this.instanceId,
        timestamp: Date.now()
      };
      finishedPlayer.getSocket().emit(NAVIGATE_RESULT, playerProgress);
      // userPorgressDb.createResult(playerProgress);
      userGameHistoryDb.save(gameResultRecord);
      await LevelManager.processNewResult(
        finishedPlayer.playerId,
        finishedPlayer.getSocket()
      );
    } else if (finishedPlayer.playerType === PlayerType.human) {
      finishedPlayer.getSocket().emit(NAVIGATE_RESULT);
    }
  }
  protected gameTick(): void {
    super.gameTick();
    const roomLog: PlayerGameStatus[] = this.roomPlayersScores;
    if (this.isAnyoneStillPlaying === false) {
      super.stopGame();
    }
    roomLogDb.save(
      roomLog,
      this.instanceId,
      this.gameTickSequence,
      this.roomType
    );
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
  async startGame(): Promise<void> {
    // client still doesn't use the countdown socket being emmited to it.
    this.botScheduler.stopCountDown();
    super.setGameIsActive();
    const countdown = new Countdown(this.roomName);
    await countdown.initiateCountdown();
    emitToRoom(this.roomName, GAME_HAS_STARTED, {
      startTimeStamp: this.roomStartTimestamp,
      roomId: this.instanceId
    });
    super.startGame();
    roomSummaryDb.save(super.roomSummary);
    console.log(`${this.roomName}-Game started.`);
  }
  protected async onStopGame(finalResult?: PlayerGameStatus[]) {
    console.log(`${this.roomName} has finished!`);
    //TODO: if there is no final result - delete or update accordingly this game on db.
    if (this.shouldSaveOnStop) {
      const finalResultDocument = await roomLogDb.save(
        this.roomPlayersScores,
        this.instanceId,
        this.gameTickSequence,
        this.roomType
      );
      roomSummaryDb.updateById(
        { roomId: this.instanceId },
        {
          finalResult: finalResultDocument
        }
      );
    }
  }
  private get randomAvatarIndex(): number {
    return random(1, 4);
  }
}
