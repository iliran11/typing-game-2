import * as io from 'socket.io';
import { FacebookUserType, DeviceType } from '../../../types/typesIndex';
import { HumanPlayer } from './Player/players-index';
import { TypingTestRoom } from './Room/TypingTestRoom';

const uuid = require('uuid/v4');
export class TypingTestManager {
  private static instance: TypingTestManager;
  rooms: Map<io.Socket, TypingTestRoom>;
  private constructor() {
    this.rooms = new Map();
  }
  initGame(socket: any, userData: FacebookUserType, deviceType: DeviceType) {
    const room = new TypingTestRoom(deviceType);
    const player = new HumanPlayer({
      socket,
      userData,
      room,
      deviceType
    });
    room.addPlayer(player);
    this.rooms.set(socket, room);
    socket.join(room.roomName);
  }
  getRoom(socket): TypingTestRoom {
    const result = this.rooms.get(socket);
    if (!result) {
      throw new Error('room does not exist');
    }
    return result;
  }
  static getInstance() {
    if (!TypingTestManager.instance) {
      TypingTestManager.instance = new TypingTestManager();
      // ... any one time initialization goes here ...
    }
    return TypingTestManager.instance;
  }
  deleteRoom(socket: io.Socket) {
    this.rooms.delete(socket);
  }
}

export const typingTestManager = TypingTestManager.getInstance(); // do something with the instance...
