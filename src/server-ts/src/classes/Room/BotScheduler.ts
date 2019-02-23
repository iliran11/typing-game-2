import { BOT_SPAWN_RATE } from '../../../../constants';

export class BotScheduler {
  timer: any;
  botSpawnInterval: number;
  onBotAddition: () => void;
  isTimerActive: boolean;
  constructor(onBotAddition: () => void) {
    this.botSpawnInterval = BOT_SPAWN_RATE;
    this.onBotAddition = onBotAddition;
    this.isTimerActive = true;
  }
  // add bot to this room if no human player is joining in X time.
  private addBot(): void {
    this.onBotAddition();
    if (this.isTimerActive) {
      this.restartCountdownBot();
    }
  }
  public startCountdownBot(): void {
    this.timer = setTimeout(this.addBot, this.botSpawnInterval);
  }
  public restartCountdownBot(): void {
    clearTimeout(this.timer);
    this.startCountdownBot();
  }
  public stopCountDown(): void {
    clearTimeout(this.timer);
    this.isTimerActive = false;
  }
}
