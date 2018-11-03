import Player from './Player'
import {PlayerType } from '../../../types'
import playerTyping from '../event-handlers/playerTyping'


export default class BotPlayer extends Player {
  private static botPlayerCounter = 0;
  private startTimestamp : number;
  private typingIndex :number = 0;
  private timeToComplete: number = 10000;

  constructor(socket,name?) {
    super(socket,name);
    this.type = this.type.bind(this);
  }
  public static getNextBotId() {
    this.botPlayerCounter++;
    return BotPlayer.botPlayerCounter
  }
  protected get guestName() {
    return `${this.serializable.type} ${BotPlayer.botPlayerCounter}`;
  }
  public get playerType() {
    return PlayerType.bot
  }
  //simulate a typing and schedule the next typing
  private type() {
    const typingData = {
      typingInput: this.playerGame.getRawLetters[this.typingIndex]
    }
    playerTyping(this.guestName,typingData);
    this.typingIndex ++;
    setTimeout(this.type,(this.timeToComplete / this.playerGame.getRawLetters.length))
  }
  getSocket() {
    return this.playerId
  }
  public onGameStart() {
    this.startTimestamp = new Date().getTime();
    this.type();
    console.log('game started for ',this.name);
  }
}