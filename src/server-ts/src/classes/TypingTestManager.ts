import { emitToRoom } from '../utilities';
import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST
} from '../../../constants';
import { TypingGameInfoI } from '../../../types/typesIndex';
import Game from './Game';
import * as io from 'socket.io';

const uuid = require('uuid/v4');
export class TypingTestManager {
  private static instance: TypingTestManager;
  rooms: Map<io.Socket, TypingTestRoom>;
  private constructor() {
    this.rooms = new Map();
  }
  initGame(socket) {
    const room = new TypingTestRoom(socket);
    this.rooms.set(socket, room);
  }
  getRoom(socket): TypingTestRoom | undefined {
    return this.rooms.get(socket);
  }
  static getInstance() {
    if (!TypingTestManager.instance) {
      TypingTestManager.instance = new TypingTestManager();
      // ... any one time initialization goes here ...
    }
    return TypingTestManager.instance;
  }
}

export const typingTestManager = TypingTestManager.getInstance(); // do something with the instance...

class TypingTestRoom {
  socket: any;
  instanceId: string;
  intervalId: any;
  game: Game;
  startTime: number;
  constructor(socket) {
    this.gametick = this.gametick.bind(this);
    this.socket = socket;
    this.instanceId = `TypingTest-${uuid()}`;
    this.game = new Game(99);
    this.intervalId = setInterval(this.gametick, 1000);
    this.startTime = Date.now();
    socket.emit(TYPING_TEST_IS_ACTIVE, this.getInitialGameData);
  }
  private get getInitialGameData(): TypingGameInfoI {
    return {
      letters: this.game.getRawLetters,
      instanceId: this.instanceId,
      isGameActive: true,
      wpm: this.game.getWpmScore(this.passedTimeMinutes),
      cpm: this.game.getWpmScore(this.passedTimeMinutes),
      accuracy: this.game.getAccuracy()
    };
  }
  private get passedTime(): number {
    return Date.now() - this.startTime;
  }
  private get passedTimeMinutes(): number {
    return this.passedTime / 60000;
  }
  private gametick() {
    this.socket.emit(TYPING_TEST_SCORE_BROADCAST, this.getInitialGameData);
  }
}
