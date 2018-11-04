import Player from './Player';
import { PlayerType } from '../../../types';
import playerTyping from '../event-handlers/playerTyping';
import RoomManager from '../classes/RoomManager';

export default class BotPlayer extends Player {
  private static botPlayerCounter = 0;
  private typingIndex: number = 0;
  /** 
   * the time we achieve our target.
   * after that the function will continue to compute for timeFraction larger than 1.
   */
  private timeToTarget: number = 50000;

  constructor(socket, name?) {
    super(socket, name);
    this.type = this.type.bind(this);
    this.typingScheduler = this.typingScheduler.bind(this);
  }
  public static getNextBotId() {
    this.botPlayerCounter++;
    return BotPlayer.botPlayerCounter;
  }
  protected get guestName() {
    return `${this.serializable.type} ${BotPlayer.botPlayerCounter}`;
  }
  public get playerType() {
    return PlayerType.bot;
  }
  //simulate a typing and schedule the next typing
  private type() {
    const currentTargetWpm = this.calculateWPM(this.timeFraction);
    //const timeToNextLetter = this.getLetterPerMillisecond(currentTargetWpm)
    const timeToNextLetter = 400
    const typingData = {
      typingInput: this.playerGame.getRawLetters[this.typingIndex]
    };
    playerTyping(this.guestName, typingData);
    this.typingIndex++;
    setTimeout(this.type, timeToNextLetter);
  }
  getSocket() {
    return this.playerId;
  }
  // get target wpm, and get the frequency of correctly typing a letter.
  private getLetterPerMillisecond(wpmTarget) {
    const millisecondsInSecond = 1000
    // wpm assume 5 chars per word.
    const cpmTarget = wpmTarget * 5
    // letter typed per second to achieve the cpmTarget.
    const lps = 60/cpmTarget;
    // move to millisecond by multiplying in 1000.
    return 1000 * lps
  }
  private calculateWPM(timeFraction) {
    // emulate the linear equation: y = 20x + 20;
    return 20 * timeFraction + 20;
  }
  private get timeFraction() {
    return this.timeElapsed / this.timeToTarget;
  }
  private get timeElapsed() {
    return RoomManager.getInstance().getRoom(this.getRoomId).timeElapsed;
  }
  // holding the typing operation until the delay is over.
  private typingScheduler() {
    if(this.timeElapsed>0) {
      this.type();
      return;
    }
    // the countdown is not finished - check again.
    setTimeout(this.typingScheduler,500)
  }
  public onGameStart() {
    this.typingScheduler();
  }
}
