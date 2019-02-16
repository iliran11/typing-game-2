import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST
} from '../../../../constants';
import { BaseRoom } from './BaseRoom';
import { TypingGameInfoI, RoomType } from '../../../../types/typesIndex';
import Game from '../Game';
import * as io from 'socket.io';
import { roomLogDb, roomSummaryDb } from '../../mongoIndex';
import Player from '../Player';
const uuid = require('uuid/v4');

export class TypingTestRoom extends BaseRoom {
  socket: any;
  intervalId: any;
  game: Game;
  player: Player;
  constructor(socket, player: Player) {
    super();
    this.onGameEnd = this.onGameEnd.bind(this);
    this.socket = socket;
    this.game = new Game(99, this.onGameEnd);
    this.player = player;
    socket.emit(TYPING_TEST_IS_ACTIVE, this.getInitialGameData);
    this.startGame();
  }
  private get getInitialGameData(): TypingGameInfoI {
    return {
      words: this.game.words,
      instanceId: this.instanceId,
      isGameActive: true,
      wpm: this.game.getWpmScore(this.passedTimeMinutes),
      cpm: this.game.getCpmScore(this.passedTimeMinutes),
      accuracy: this.game.getAccuracy(),
      player: this.player.serializable
    };
  }
  private onGameEnd() {
    if (this.player.isAuthenticated) {
      roomSummaryDb.saveTypingTest(this.getInitialGameData);
    }
  }
  protected onGameTick() {
    if (this.player.isAuthenticated) {
      roomLogDb.save(
        this.getInitialGameData,
        this.instanceId,
        this.gameTickSequence,
        RoomType.TYPING_TEST
      );
    }
    this.socket.emit(TYPING_TEST_SCORE_BROADCAST, this.getInitialGameData);
  }
}
