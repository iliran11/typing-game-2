import { RoomType, PlayerType } from '../../../../types/typesIndex';
import { BasePlayer, BasePlayersOptions } from './BasePlayer';
import { MultiplayerPlayerTyping } from '../../event-handlers/MultiplayerPlayerTyping';
import onGameFinished from '../../event-handlers/onGameFinished';

export abstract class BotPlayer extends BasePlayer {
  identifier: string;
  private typingIndex: number = 0;
  private timeToTarget: number = 50000;

  constructor(options: BasePlayersOptions) {
    super(options);
    this.identifier = `${this.playerType} ${this.counterNumber}`;
  }
  get playerType() {
    return PlayerType.bot;
  }

  // gets the current time(X), and returns the current WPM(y)
  // basically represent the equation of the wpm;
  abstract calculateCurrentWpm(timeFraction: number): number;
  get isAuthenticated() {
    return false;
  }
  protected get timeFraction(): number {
    return this.timeElapsed / this.timeToTarget;
  }
  protected get timeElapsed(): number {
    return this.room.timeElapsed;
  }
  private type = () => {
    const currentTargetWpm = this.calculateCurrentWpm(this.timeFraction);
    const timeToNextLetter = this.timeToNextLetter(currentTargetWpm);
    // const timeToNextLetter = 400
    const typingData = {
      typingInput: this.playerGame.getRawLetters[this.typingIndex],
      roomType: RoomType.MULTIPLAYER
    };
    // console.log(`${this.guestName} typed: ${typingData.typingInput}. next typing in: ${timeToNextLetter}`)
    MultiplayerPlayerTyping(this.name, typingData);
    this.typingIndex++;
    // if there are more letters to type - type. else - annouce game finished.
    if (this.typingIndex < this.playerGame.getRawLetters.length) {
      setTimeout(this.type, timeToNextLetter);
    } else {
      // console.log(`${this.getName} is Done typing in room-${this.getRoomId}!`);
      onGameFinished(this.name);
    }
  };
  private timeToNextLetter(wpmTarget) {
    // wpm assume 5 chars per word.
    const cpmTarget = wpmTarget * 5;
    // letter typed per second to achieve the cpmTarget.
    const lps = 60 / cpmTarget;
    // move to millisecond by multiplying in 1000.
    return 1000 * lps;
  }
  // holding the typing operation until the delay is over.
  private typingScheduler = () => {
    if (this.timeElapsed > 0) {
      this.type();
      return;
    }
    // the countdown is not finished - check again.
    setTimeout(this.typingScheduler, 500);
  };
  public onGameStart() {
    this.typingScheduler();
  }
}
