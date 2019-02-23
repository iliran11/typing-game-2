import { GAME_TIMEOUT_DURATION, GAME_HAS_TIMEOUT } from '../../../../constants';
import Player from '../Player';
import BotPlayer from '../BotPlayer';
import { emitToRoom } from '../../utilities';
const uuid = require('uuid/v4');

export class BaseRoom {
  instanceId: string;
  intervalId: any;
  protected timePassed: number;
  protected timerId: any;
  protected timeIncrement: number = 1000;
  protected gameTickSequence: number;
  protected players: (Player | BotPlayer)[];

  public roomStartTimestamp: number = 0;

  constructor() {
    this.gameTickSequence = 1;
    this.timePassed = 0;
    this.instanceId = `Room-${uuid()}`;
    this.players = [];
  }
  protected get passedTimeMinutes() {
    return this.timePassed / 60000;
  }
  get timeElapsed(): number {
    return this.timePassed;
  }
  get isClosed() {
    return false;
  }
  private get roomStatus(): PlayerGameStatus[] {
    return [];
  }
  startGame() {
    this.timerId = setInterval(this.gameTick.bind(this), this.timeIncrement);
    this.roomStartTimestamp = Date.now();
    this.onStartGame();
  }
  get shouldSaveOnStop() {
    return true;
  }
  protected stopGame() {
    clearTimeout(this.timerId);
    this.onStopGame();
  }
  gameTick() {
    this.timePassed += this.timeIncrement;
    this.gameTickSequence++;
    if (this.timePassed > GAME_TIMEOUT_DURATION) {
      this.stopGame();
      emitToRoom(this.roomName, GAME_HAS_TIMEOUT, { roomId: this.instanceId });
    }
    this.onGameTick();
  }
  public get roomName(): string {
    return `room-${this.instanceId}`;
  }
  protected onStartGame() {}
  protected onStopGame() {}
  protected onGameTick() {}
}
