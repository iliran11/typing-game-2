import { BaseRoom } from './BaseRoom';
import ServerManager from '../ServerManager';
import {
  MAX_PLAYERS_PER_ROOM,
  GAME_HAS_STARTED,
  NAVIGATE_RESULT,
  SCORE_BROADCAST
} from '../../../../constants';
import { clearTimeout } from 'timers';
import PlayerManager from '../PlayerManager';
import { multiplayerRoomManager } from '../MultiplayerRoomManager';
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
import { userPorgressDb } from '../../mongo/AchievementsProgress/AchievementsProgress';
import { Countdown } from '../Countdown';
import BotPlayer from '../BotPlayer';
var countBy = require('lodash.countby');
var isNil = require('lodash.isnil');
const random = require('lodash.random');
const uuid = require('uuid/v4');

export default class MultiplayerRoom extends BaseRoom {
  // measure game length duration - not sure if needed.
  private avatarIndexes: number = 0;
  constructor(roomType: RoomType) {
    super(roomType);
  }
  addPlayer(player: Player): void {
    super.addPlayer(player);
    player.setAvatar(this.randomAvatarIndex);
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
  protected onGameTick(): void {
    const roomLog: PlayerGameStatus[] = this.roomPlayersScores;
    this.server.in(this.roomName).emit(SCORE_BROADCAST, roomLog);
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
  async onStartGame(): Promise<void> {
    // client still doesn't use the countdown socket being emmited to it.
    const countdown = new Countdown(this.roomName);
    await countdown.initiateCountdown();
    emitToRoom(this.roomName, GAME_HAS_STARTED, {
      startTimeStamp: this.roomStartTimestamp,
      roomId: this.instanceId
    });
    roomSummaryDb.save({
      roomType: this.roomType,
      letters: this.roomLetters,
      players: this.playersArray,
      roomId: this.instanceId,
      finalResult: {
        results: this.roomPlayersScores
      }
    });
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
    return random(0, 11);
  }
}
