import Player from './Player'
import {PlayerType } from '../../../types'
import playerTyping from '../event-handlers/playerTyping'
import RoomManager from '../classes/RoomManager';


export default class BotPlayer extends Player {
  private static botPlayerCounter = 0;
  private typingIndex :number = 0;
  private timeToComplete: number = 50000;

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
    setTimeout(this.type,this.maxPace)
  }
  getSocket() {
    return this.playerId
  }
  private get maxPace() {
    return this.timeToComplete / this.playerGame.getRawLetters.length
  }
  private get intervalTimingFunction() {
    return Math.pow(this.timeFraction,2)
  }
  private get timeFraction() {
    return this.timeElapsed / this.timeToComplete
  }
  private get timeElapsed() {
    return RoomManager.getInstance().getRoom(this.getRoomId).timeElapsed
  }
  public onGameStart() {
    this.type();
    console.log('game started for ',this.name);
  }
}