import Player from './Player'
import {PlayerType } from '../../../types'

export default class BotPlayer extends Player {
  private static botPlayerCounter = 0;

  constructor(guestName,playerType) {
    super(guestName,playerType)
  }
  public static getNextBotId() {
    this.botPlayerCounter++;
    return BotPlayer.botPlayerCounter
  }
  protected get guestName() {
    return `${this.serializable.type} ${BotPlayer.botPlayerCounter}`;
  }
  protected get playerType() {
    return PlayerType.bot
  }
}