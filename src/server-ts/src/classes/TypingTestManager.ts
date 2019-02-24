import * as io from 'socket.io';
import Player from '../classes/Player';
import { TypingTestRoom } from './Room/TypingTestRoom';
import {
  FacebookUserType,
  RoomType,
  PlayerType
} from '../../../types/typesIndex';

const uuid = require('uuid/v4');
export class TypingTestManager {
  private static instance: TypingTestManager;
  rooms: Map<io.Socket, TypingTestRoom>;
  private constructor() {
    this.rooms = new Map();
  }
  initGame(
    socket: any,
    userData: FacebookUserType,
    level: number,
    roomType: RoomType,
    playerType: PlayerType
  ) {
    const room = new TypingTestRoom();
    const player = new Player({
      socket,
      userData,
      level,
      roomType,
      room
    });
    room.addPlayer(player);
    room.startGame();
    this.rooms.set(socket, room);
    socket.join(room.roomName);
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
