import Player from './Player'

export default class BotPlayer extends Player {
  private static botPlayerCounter = 0;

  constructor(guestName) {
    super(guestName)
  }
  public static getNextBotId() {
    this.botPlayerCounter++;
    return BotPlayer.botPlayerCounter
  }
  protected get guestName() {
    return `Bot ${BotPlayer.botPlayerCounter}`;
  }
}