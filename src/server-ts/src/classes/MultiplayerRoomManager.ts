import MultiplayerRoom from './Room/MultiplayerRoom';
import * as socketIo from 'socket.io';
import Player from './Player';
import {
  MAX_PLAYERS_PER_ROOM,
  YOU_JOINED_ROOM,
  COMPETITOR_JOINED_ROOM
} from '../../../constants';
import {
  RoomType,
  PlayerType,
  JoiningRoomResponse
} from '../../../types/typesIndex';
import PlayerManager from './PlayerManager';
import { emitToRoom } from '../utilities';

export default class MultiplayerRoomManager {
  private static instance: MultiplayerRoomManager;
  static words = ['hello', 'goodbye'];
  rooms: Map<number, MultiplayerRoom>;
  playerManager: PlayerManager;

  private constructor() {
    this.rooms = new Map();
    this.playerManager = PlayerManager.getInstance();
  }
  allocateToRoom(socket: any, playerType: PlayerType) {
    const player = this.playerManager.getPlayer(socket);
    const room = this.addPlayer(player);
    if (playerType === PlayerType.human) {
      socket.join(room.roomName);
      const response: JoiningRoomResponse = {
        roomId: room.roomId,
        playersGameStatus: room.playersInRoom,
        words: player.playerGame.words,
        roomSize: room.maxPlayersInRoom,
        isGameActive: room.isGameActive,
        myId: player.playerId
      };
      socket.emit(YOU_JOINED_ROOM, response);
      socket.to(room.roomName).emit(
        COMPETITOR_JOINED_ROOM,
        player.playerGameStatus({
          timePassedMinutes: 0
        })
      );
    } else {
      const playerGameStatus = player.playerGameStatus({
        timePassedMinutes: 0
      }).serialize;
      emitToRoom(room.roomName, COMPETITOR_JOINED_ROOM, playerGameStatus);
    }
  }
  private addPlayer(player: Player): MultiplayerRoom {
    let room: MultiplayerRoom;
    if (this.openRooms > 0) {
      room = this.addPlayerToExistingRoom(player);
    } else {
      room = this.addPlayerToNewRoom(player, RoomType.MULTIPLAYER);
    }
    player.setRoomId(room.roomId);
    return room;
  }
  private addPlayerToExistingRoom(player: Player): MultiplayerRoom {
    // @ts-ignore
    const selectedRoom: MultiplayerRoom = this.rooms.get(this.availableRoomNumber);
    selectedRoom.addPlayer(player);
    return selectedRoom;
  }
  private addPlayerToNewRoom(player: Player, roomType: RoomType): MultiplayerRoom {
    const room = this.createNewRoom(roomType);
    room.addPlayer(player);
    return room;
  }

  removePlayer(player: Player): MultiplayerRoom | null {
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
  getRoom(roomId: number): MultiplayerRoom {
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

  private createNewRoom(roomType: RoomType): MultiplayerRoom {
    const room = new MultiplayerRoom(MultiplayerRoomManager.words, roomType);
    this.rooms.set(room.roomId, room);
    return room;
  }
  get openRoomsIds(): number[] {
    const openRooms: number[] = [];
    this.rooms.forEach(
      (room: MultiplayerRoom): void => {
        if (!room.isClosed) {
          openRooms.push(room.roomId);
        }
      }
    );
    return openRooms;
  }
  static getInstance() {
    if (!MultiplayerRoomManager.instance) {
      MultiplayerRoomManager.instance = new MultiplayerRoomManager();
    }
    return MultiplayerRoomManager.instance;
  }
}

export const multiplayerRoomManager = MultiplayerRoomManager.getInstance();
