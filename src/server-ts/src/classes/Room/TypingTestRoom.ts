import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST,
  NAVIGATE_RESULT,
  TYPING_TEST_DURATION
} from '../../../../constants';
import {
  RoomType,
  TypingTestInitGame,
  NavigateToResultI
} from '../../../../types/typesIndex';
import { roomLogDb, roomSummaryDb } from '../../mongoIndex';
import { BaseRoom } from './BaseRoom';
import { emitToRoom } from '../../utilities';

export class TypingTestRoom extends BaseRoom {
  intervalId: any;
  constructor() {
    super(RoomType.TYPING_TEST);
    super.enableTimeout = false;
  }
  get player() {
    return this.playersArray[0];
  }
  get socket() {
    return this.player.getSocket();
  }
  public startGame() {
    if (this.isGameActive === false) {
      super.startGame();
    } else {
      throw new Error('trying to start an already started game');
    }
  }
  protected stopGame() {
    super.stopGame();
    roomSummaryDb.save(this.roomSummary);
  }
  addPlayer(player) {
    super.addPlayer(player);
    const initPayload: TypingTestInitGame = {
      ...this.getPlayerGameStatus(this.player),
      words: this.player.playerGame.words
    };
    this.player.getSocket().emit(TYPING_TEST_IS_ACTIVE, initPayload);
  }
  protected gameTick() {
    super.gameTick();
    if (this.timePassed > TYPING_TEST_DURATION) {
      const payload: NavigateToResultI = {
        roomId: this.instanceId,
        roomType: RoomType.TYPING_TEST
      };
      emitToRoom(this.roomName, NAVIGATE_RESULT, payload);
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
