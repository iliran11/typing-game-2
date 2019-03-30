import { GAME_HAS_STARTED,COMPETITOR_JOINED_ROOM } from '../../../../constants';
import {
  DeviceType,
  PlayerGameStatus,
  RoomType
} from '../../../../types/typesIndex';
import { roomSummaryDb } from '../../mongoIndex';
import { emitToRoom } from '../../utilities';
import { Countdown } from '../Countdown';
import { BasePlayer, LinearBotPlayer } from '../Player/players-index';
import { BaseRoom } from './BaseRoom';
import { BotScheduler } from './BotScheduler';
import PlayerManager from '../PlayerManager';
import { BotManager } from './BotsManager/BotManager';
const random = require('lodash.random');

export default class MultiplayerRoom extends BaseRoom {
  // measure game length duration - not sure if needed.
  private avatarIndexes: number = 0;
  private botManager: BotManager;
  protected botScheduler: BotScheduler;
  constructor(roomType: RoomType, deviceType: DeviceType) {
    super(roomType, deviceType);
    this.addBot = this.addBot.bind(this);
    this.botScheduler = new BotScheduler(this.addBot);
    this.botScheduler.startCountdownBot();
    this.maxPlayersInRoom = deviceType === DeviceType.DESKTOP ? 4 : 2;
    this.botManager = new BotManager(this.roomDeviceType, this);
  }
  addPlayer(player: BasePlayer): void {
    super.addPlayer(player);
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
  }
  protected gameTick(): void {
    super.gameTick();
    const roomLog: PlayerGameStatus[] = this.roomPlayersScores;
    if (this.isAnyoneStillPlaying === false) {
      super.stopGame();
    }
  }
  addBot() {
    const player = this.botManager.addBot();
    PlayerManager.getInstance().addPlayer(player);
    this.addPlayer(player);
    const playerGameStatus = this.getPlayerGameStatus(player);
    emitToRoom(this.roomName, COMPETITOR_JOINED_ROOM, playerGameStatus);
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
