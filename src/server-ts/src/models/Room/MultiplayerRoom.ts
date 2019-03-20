import { GAME_HAS_STARTED, NAVIGATE_RESULT } from '../../../../constants';
import {
  AchievementsProgressI,
  PlayerGameStatus,
  PlayerType,
  RoomType,
  DeviceType
} from '../../../../types/typesIndex';
import { roomLogDb, roomSummaryDb, userGameHistoryDb } from '../../mongoIndex';
import { emitToRoom } from '../../utilities';
import {
  HumanPlayer,
  BasePlayer,
  LinearBotPlayer
} from '../Player/players-index';
import { Countdown } from '../Countdown';
import LevelManager from '../LevelManager';
import { multiplayerRoomManager } from '../MultiplayerRoomManager';
import PlayerManager from '../PlayerManager';
import { BaseRoom } from './BaseRoom';
import { BotScheduler } from './BotScheduler';
const random = require('lodash.random');

export default class MultiplayerRoom extends BaseRoom {
  // measure game length duration - not sure if needed.
  private avatarIndexes: number = 0;
  protected botScheduler: BotScheduler;
  constructor(roomType: RoomType, deviceType: DeviceType) {
    super(roomType, deviceType);
    this.addBot = this.addBot.bind(this);
    this.botScheduler = new BotScheduler(this.addBot);
    this.botScheduler.startCountdownBot();
  }
  addPlayer(player: BasePlayer): void {
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
  deletePlayer(player: BasePlayer): void {}
  async playerHasFinished(finishedPlayer: BasePlayer) {
    super.playerHasFinished(finishedPlayer);
    const gameResultRecord = super.getPlayerGameStatus(finishedPlayer);
    if (finishedPlayer instanceof HumanPlayer) {
      if (finishedPlayer.isAuthenticated) {
        const stats = await LevelManager.getPlayerStats(
          finishedPlayer.playerId
        );
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
        if (finishedPlayer instanceof HumanPlayer) {
          finishedPlayer.socket.emit(NAVIGATE_RESULT, playerProgress);
        }
        // userPorgressDb.createResult(playerProgress);
        await LevelManager.processNewResult(
          finishedPlayer.playerId,
          finishedPlayer.socket
        );
      } else if (finishedPlayer.playerType === PlayerType.human) {
        // finishedPlayer.socket.emit(NAVIGATE_RESULT,{});
      }
    }
  }
  protected gameTick(): void {
    super.gameTick();
    const roomLog: PlayerGameStatus[] = this.roomPlayersScores;
    if (this.isAnyoneStillPlaying === false) {
      super.stopGame();
    }
  }
  addBot() {
    multiplayerRoomManager.allocateToRoom(
      null,
      undefined,
      1,
      this.roomType,
      PlayerType.bot,
      this.roomDeviceType
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
  }
  private get randomAvatarIndex(): number {
    return random(1, 4);
  }
}
