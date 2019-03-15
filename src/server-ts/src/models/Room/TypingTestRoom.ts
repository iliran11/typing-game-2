import {
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST,
  NAVIGATE_RESULT,
  TYPING_TEST_DURATION
} from '../../../../constants';
import {
  RoomType,
  TypingTestInitGame,
  RoomInfo
} from '../../../../types/typesIndex';
import { roomLogDb, roomSummaryDb } from '../../mongoIndex';
import { HumanPlayer } from '../Player/players-index';
import { BaseRoom } from './BaseRoom';
import { emitToRoom } from '../../utilities';
import { typingTestManager } from '../TypingTestManager';

export class TypingTestRoom extends BaseRoom {
  intervalId: any;
  constructor() {
    super(RoomType.TYPING_TEST);
    super.enableTimeout = false;
  }
  get player(): HumanPlayer {
    const player = this.playersArray[0];
    if (player instanceof HumanPlayer) {
      return player;
    } else {
      throw new Error('non-human player in typing test. must be a mistake');
    }
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
    const socket = this.player.getSocket();
    typingTestManager.deleteRoom(socket);
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
      const payload: RoomInfo = {
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
