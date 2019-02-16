import * as io from 'socket.io';
import Player from '../classes/Player';
import { TypingTestRoom } from './Room/TypingTestRoom';

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
