import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST
} from '../../../../constants';
import { RoomType, TypingTestInitGame } from '../../../../types/typesIndex';
import { roomLogDb, roomSummaryDb } from '../../mongoIndex';
import { BaseRoom } from './BaseRoom';

export class TypingTestRoom extends BaseRoom {
  socket: any;
  intervalId: any;
  constructor() {
    super(RoomType.TYPING_TEST);
  }
  get player() {
    return this.playersArray[0];
  }
  public startGame() {
    super.startGame();
    const initPayload: TypingTestInitGame = {
      ...this.getPlayerGameStatus(this.player),
      words: this.player.playerGame.words
    };
    this.player.getSocket().emit(TYPING_TEST_IS_ACTIVE, initPayload);
  }
  protected stopGame() {
    super.stopGame();
    roomSummaryDb.save(this.roomSummary);
  }
  protected onGameTick() {
    if (this.player.isAuthenticated) {
      roomLogDb.save(
        this.roomPlayersScores,
        this.instanceId,
        this.gameTickSequence,
        RoomType.TYPING_TEST
      );
    }
    this.socket.emit(TYPING_TEST_SCORE_BROADCAST, this.roomPlayersScores);
  }
}
