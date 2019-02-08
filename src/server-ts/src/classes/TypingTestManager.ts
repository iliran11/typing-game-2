import { emitToRoom } from '../utilities';
import { TYPING_TEST_IS_ACTIVE } from '../../../constants';
import { TypingGameInfoI } from '../../../types/typesIndex';
const uuid = require('uuid/v4');

class TypingTestManager {
  private static instance: TypingTestManager;
  rooms: Map<number, TypingTestRoom>;
  private constructor() {
    this.rooms = new Map();
  }
  initGame(socket) {
    const room = new TypingTestRoom(socket);
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
  constructor(socket) {
    this.socket = this.socket;
    this.instanceId = `TypingTest-${uuid()}`;
    socket.emit(TYPING_TEST_IS_ACTIVE, this.getInitialGameData);
  }
  private get getInitialGameData(): TypingGameInfoI {
    return {
      letters: ['a', 'b', 'c'],
      instanceId: this.instanceId,
      isGameActive: true
    };
  }
  private gametick() {}
}
