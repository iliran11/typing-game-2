import Player from './Player';
import { PlayerType } from '../../../types';
import playerTyping from '../event-handlers/playerTyping';
import RoomManager from './RoomManager';
import onGameFinished from '../event-handlers/onGameFinished';
const random = require('lodash.random');
export default class BotPlayer extends Player {
  private static botPlayerCounter = 0;
  private typingIndex: number = 0;
  /**
   * the time we achieve our target.
   * after that the function will continue to compute for timeFraction larger than 1.
   */
  private timeToTarget: number = 50000;
  slope: number;
  startingPoint: number;

  constructor(socket: any, name?: any, level = 1) {
    super(socket, name, level);
    this.type = this.type.bind(this);
    this.typingScheduler = this.typingScheduler.bind(this);
    this.slope = random(10, 30);
    this.startingPoint = random(10, 30);
  }
  public static getNextBotId() {
    this.botPlayerCounter++;
    return BotPlayer.botPlayerCounter;
  }
  public get playerType() {
    return PlayerType.bot;
  }
  //simulate a typing and schedule the next typing
  private type() {
    const currentTargetWpm = this.linearWpm(this.timeFraction);
    const timeToNextLetter = this.getLetterPerMillisecond(currentTargetWpm);
    // const timeToNextLetter = 400
    const typingData = {
      typingInput: this.playerGame.getRawLetters[this.typingIndex]
    };
    // console.log(`${this.guestName} typed: ${typingData.typingInput}. next typing in: ${timeToNextLetter}`)
    playerTyping(this.name, typingData);
    this.typingIndex++;
    // if there are more letters to type - type. else - annouce game finished.
    if (this.typingIndex < this.playerGame.getRawLetters.length) {
      setTimeout(this.type, timeToNextLetter);
    } else {
      // console.log(`${this.getName} is Done typing in room-${this.getRoomId}!`);
      onGameFinished(this.name);
    }
  }
  getSocket() {
    return this.playerId;
  }
  // get target wpm, and get the frequency of correctly typing a letter.
  private getLetterPerMillisecond(wpmTarget) {
    const millisecondsInSecond = 1000;
    // wpm assume 5 chars per word.
    const cpmTarget = wpmTarget * 5;
    // letter typed per second to achieve the cpmTarget.
    const lps = 60 / cpmTarget;
    // move to millisecond by multiplying in 1000.
    return 1000 * lps;
  }
  private linearWpm(timeFraction) {
    // emulate the linear equation: y = 20x + 20;
    const startingPoint = random(10, 30);
    return this.slope * timeFraction + this.startingPoint;
  }
  private get timeFraction() {
    return this.timeElapsed / this.timeToTarget;
  }
  private get timeElapsed() {
    return RoomManager.getInstance().getRoom(this.getRoomId).timeElapsed;
  }
  // holding the typing operation until the delay is over.
  private typingScheduler() {
    if (this.timeElapsed > 0) {
      this.type();
      return;
    }
    // the countdown is not finished - check again.
    setTimeout(this.typingScheduler, 500);
  }
  public onGameStart() {
    console.log(`${this.getName} initiated typingScheduler.`);
    this.typingScheduler();
  }
}
