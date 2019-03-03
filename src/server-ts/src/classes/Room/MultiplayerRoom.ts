import { BaseRoom } from './BaseRoom';
import {
  GAME_HAS_STARTED,
  NAVIGATE_RESULT,
} from '../../../../constants';
import {
  AchievementsProgressI,
  PlayerGameStatus,
  PlayerType,
  RoomType
} from '../../../../types/typesIndex';
import Player from '../Player';
import { emitToRoom } from '../../utilities';
import { roomLogDb, userGameHistoryDb, roomSummaryDb } from '../../mongoIndex';
import LevelManager from '../LevelManager';
import { Countdown } from '../Countdown';
const random = require('lodash.random');

export default class MultiplayerRoom extends BaseRoom {
  // measure game length duration - not sure if needed.
  private avatarIndexes: number = 0;
  constructor(roomType: RoomType) {
    super(roomType);
  }
  addPlayer(player: Player): void {
    player.setAvatar(this.randomAvatarIndex);
    super.addPlayer(player);
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
  async startGame(): Promise<void> {
    // client still doesn't use the countdown socket being emmited to it.
    super.setGameIsActive();
    const countdown = new Countdown(this.roomName);
    await countdown.initiateCountdown();
    super.startGame();
    emitToRoom(this.roomName, GAME_HAS_STARTED, {
      startTimeStamp: this.roomStartTimestamp,
      roomId: this.instanceId
    });
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
