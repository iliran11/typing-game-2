import Room from "./Room";
import * as socketIo from "socket.io";
import Player from "./Player";
import { MAX_PLAYERS_PER_ROOM } from "../../../constants";

export default class RoomManager {
  private static instance: RoomManager;
  static words = ["hello", "goodbye"];
  rooms: Map<number, Room>;

  private constructor() {
    this.rooms = new Map();
    // create first new room;
    this.createNewRoom();
  }
  addPlayer(player: Player): void {
    if (this.openRooms > 0) {
      this.addPlayerToExistingRoom(player);
    } else {
      this.addPlayerToNewRoom(player);
    }
  }
  removePlayer(player: Player): void {
    const roomId: number = player.roomId;
    if (roomId) {
      const room = this.getRoom(roomId);
      room.deletePlayer(player);
      console.log(`${player.playerId} has left ${room.roomName}. Capacity: ${room.playersInRoom.length}/${MAX_PLAYERS_PER_ROOM}`)
    }
  }
  getRoom(roomId: number): Room {
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
  private addPlayerToExistingRoom(player: Player): void {
    const selectedRoom: Room = this.rooms.get(this.availableRoomNumber);
    selectedRoom.addPlayer(player);
    return;
  }
  private createNewRoom(): Room {
    const room = new Room(RoomManager.words);
    this.rooms.set(room.roomId, room);
    return room;
  }
  private addPlayerToNewRoom(player: Player): void {
    const room = this.createNewRoom();
    room.addPlayer(player);
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
