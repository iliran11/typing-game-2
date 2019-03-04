import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST,
  NAVIGATE_RESULT,
  TYPING_TEST_DURATION
} from '../../../../constants';
import { RoomType, TypingTestInitGame } from '../../../../types/typesIndex';
import { roomLogDb, roomSummaryDb } from '../../mongoIndex';
import { BaseRoom } from './BaseRoom';
import { emitToRoom } from '../../utilities';

export class TypingTestRoom extends BaseRoom {
  intervalId: any;
  constructor() {
    super(RoomType.TYPING_TEST);
  }
  get player() {
    return this.playersArray[0];
  }
  get socket() {
    return this.player.getSocket();
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
  protected gameTick() {
    super.gameTick();
    if (this.timePassed > TYPING_TEST_DURATION) {
      emitToRoom(this.roomName, NAVIGATE_RESULT, {
        roomId: this.instanceId,
        RoomType: RoomType.TYPING_TEST
      });
      this.stopGame();
    }
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
