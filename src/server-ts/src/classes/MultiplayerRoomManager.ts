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
  JoiningRoomResponse,
  FacebookUserType
} from '../../../types/typesIndex';
import PlayerManager from './PlayerManager';
import { emitToRoom } from '../utilities';
import BotPlayer from './BotPlayer';

export default class MultiplayerRoomManager {
  private static instance: MultiplayerRoomManager;
  static words = ['hello', 'goodbye'];
  rooms: Map<string, MultiplayerRoom>;
  playerManager: PlayerManager;

  private constructor() {
    this.rooms = new Map();
    this.playerManager = PlayerManager.getInstance();
  }
  allocateToRoom(
    socket: any,
    userData: FacebookUserType | undefined,
    level: number,
    roomType: RoomType,
    playerType: PlayerType
  ) {
    const room = this.getAllocatedRoom();
    const playerOpts = {
      socket,
      userData,
      level,
      roomType,
      room
    };
    let player: BotPlayer | Player;
    if (playerType === PlayerType.human) {
      player = new Player(playerOpts);
    } else {
      player = new BotPlayer(playerOpts);
      player.setRoomId(room.instanceId);
    }
    this.playerManager.addPlayer(player);
    const playerGameStatus = room.getPlayerGameStatus(player);
    if (playerType === PlayerType.human) {
      socket.join(room.roomName);
      room.addPlayer(player);
      const response: JoiningRoomResponse = {
        roomId: room.instanceId,
        playersGameStatus: room.roomPlayersScores,
        words: player.playerGame.words,
        roomSize: room.maxPlayersInRoom,
        isGameActive: room.isGameActive,
        myId: player.playerId
      };
      socket.emit(YOU_JOINED_ROOM, response);
      socket.to(room.roomName).emit(COMPETITOR_JOINED_ROOM, playerGameStatus);
    } else {
      console.log(
        `[emit to ${room.roomName}]: ${playerGameStatus.playerId}) joined.`
      );
      room.addPlayer(player);
      emitToRoom(room.roomName, COMPETITOR_JOINED_ROOM, playerGameStatus);
    }
  }
  private getAllocatedRoom(): MultiplayerRoom {
    let room: MultiplayerRoom;
    if (this.openRooms !== '') {
      room = this.getExistingRoom();
    } else {
      room = this.getNewRoom(RoomType.MULTIPLAYER);
    }
    return room;
  }
  private getExistingRoom(): MultiplayerRoom {
    // @ts-ignore
    const selectedRoom: MultiplayerRoom = this.rooms.get(
      this.availableRoomNumber
    );
    return selectedRoom;
  }
  private getNewRoom(roomType: RoomType): MultiplayerRoom {
    const room = this.createNewRoom(roomType);

    return room;
  }

  removePlayer(player: Player): MultiplayerRoom | null {
    return null;
  }
  getRoomById(roomId: string): MultiplayerRoom {
    // @ts-ignore
    return this.rooms.get(roomId);
  }
  private get openRooms(): string {
    if (this.openRoomsIds.length > 0) {
      return this.openRoomsIds[0];
    }
    return '';
  }
  private get availableRoomNumber(): string {
    return this.openRoomsIds[0];
  }

  private createNewRoom(roomType: RoomType): MultiplayerRoom {
    const room = new MultiplayerRoom(RoomType.MULTIPLAYER);
    this.rooms.set(room.instanceId, room);
    return room;
  }
  get openRoomsIds(): string[] {
    const openRooms: string[] = [];
    this.rooms.forEach(
      (room: MultiplayerRoom): void => {
        if (!room.isClosed) {
          openRooms.push(room.instanceId);
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
