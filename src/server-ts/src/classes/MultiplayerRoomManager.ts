import Room from './Room';
import * as socketIo from 'socket.io';
import Player from './Player';
import { MAX_PLAYERS_PER_ROOM } from '../../../constants';
import { RoomType } from '../../../types';

export default class RoomManager {
  private static instance: RoomManager;
  static words = ['hello', 'goodbye'];
  rooms: Map<number, Room>;

  private constructor() {
    this.rooms = new Map();
  }
  addPlayer(player: Player, roomType: RoomType): Room {
    let room: Room;
    if (this.openRooms > 0) {
      room = this.addPlayerToExistingRoom(player);
    } else {
      room = this.addPlayerToNewRoom(player, roomType);
    }
    player.setRoomId(room.roomId);
    return room;
  }
  private addPlayerToExistingRoom(player: Player): Room {
    // @ts-ignore
    const selectedRoom: Room = this.rooms.get(this.availableRoomNumber);
    selectedRoom.addPlayer(player);
    return selectedRoom;
  }
  private addPlayerToNewRoom(player: Player, roomType: RoomType): Room {
    const room = this.createNewRoom(roomType);
    room.addPlayer(player);
    return room;
  }

  removePlayer(player: Player): Room | null {
    return null;
    const roomId: number = player.getRoomId;

    if (roomId) {
      const room = this.getRoom(roomId);
      /** if game is active - do not delete player
       *  TODO: mark the player as non-active.
       *
       */
      if (room.isGameActive) return room;
      room.deletePlayer(player);
      console.log(
        `${player.playerId} has left ${room.roomName}. Capacity: ${
          room.playersInRoom.length
        }/${MAX_PLAYERS_PER_ROOM}`
      );
      return room;
    }
    return null;
  }
  getRoom(roomId: number): Room {
    // @ts-ignore
    return this.rooms.get(roomId);
  }
  private get openRooms(): number {
    if (this.openRoomsIds.length > 0) {
      return this.openRoomsIds[0];
    }
    return -1;
  }
  private get availableRoomNumber(): number {
    return this.openRoomsIds[0];
  }

  private createNewRoom(roomType: RoomType): Room {
    const room = new Room(RoomManager.words, roomType);
    this.rooms.set(room.roomId, room);
    return room;
  }
  get openRoomsIds(): number[] {
    const openRooms: number[] = [];
    this.rooms.forEach(
      (room: Room): void => {
        if (!room.isClosed) {
          openRooms.push(room.roomId);
        }
      }
    );
    return openRooms;
  }
  static getInstance() {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }
    return RoomManager.instance;
  }
}