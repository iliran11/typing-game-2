import { emitToRoom } from '../utilities';
import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST
} from '../../../constants';
import { TypingGameInfoI, RoomType } from '../../../types/typesIndex';
import Game from './Game';
import * as io from 'socket.io';
import { roomLogDb, roomSummaryDb } from '../mongoIndex';
import Player from '../classes/Player';

const uuid = require('uuid/v4');
export class TypingTestManager {
  private static instance: TypingTestManager;
  rooms: Map<io.Socket, TypingTestRoom>;
  private constructor() {
    this.rooms = new Map();
  }
  initGame(socket, player: Player) {
    const room = new TypingTestRoom(socket, player);
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
  gameTickSequenceId: number;
  player: Player;
  constructor(socket, player: Player) {
    this.gametick = this.gametick.bind(this);
    this.onGameEnd = this.onGameEnd.bind(this);
    this.socket = socket;
    this.instanceId = `TypingTest-${uuid()}`;
    this.game = new Game(99, this.onGameEnd);
    this.intervalId = setInterval(this.gametick, 1000);
    this.startTime = Date.now();
    this.gameTickSequenceId = 0;
    this.player = player;
    socket.emit(TYPING_TEST_IS_ACTIVE, this.getInitialGameData);
  }
  private get getInitialGameData(): TypingGameInfoI {
    return {
      words: this.game.words,
      instanceId: this.instanceId,
      isGameActive: true,
      wpm: this.game.getWpmScore(this.passedTimeMinutes),
      cpm: this.game.getWpmScore(this.passedTimeMinutes),
      accuracy: this.game.getAccuracy(),
      player: this.player.serializable
    };
  }
  private get passedTime(): number {
    return Date.now() - this.startTime;
  }
  private get passedTimeMinutes(): number {
    return this.passedTime / 60000;
  }
  private onGameEnd() {
    if (this.player.isAuthenticated) {
      roomSummaryDb.saveTypingTest(this.getInitialGameData);
    }
  }
  private gametick() {
    this.gameTickSequenceId++;
    if (this.player.isAuthenticated) {
      roomLogDb.save(
        this.getInitialGameData,
        this.instanceId,
        this.gameTickSequenceId,
        RoomType.TYPING_TEST
      );
    }
    this.socket.emit(TYPING_TEST_SCORE_BROADCAST, this.getInitialGameData);
  }
}
