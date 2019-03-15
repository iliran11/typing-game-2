import { COMPETITOR_JOINED_ROOM, YOU_JOINED_ROOM } from '../../../constants';
import {
  FacebookUserType,
  JoiningRoomResponse,
  PlayerType,
  RoomType
} from '../../../types/typesIndex';
import { emitToRoom } from '../utilities';
import {
  LinearBotPlayer,
  HumanPlayer,
  BasePlayer
} from './Player/players-index';
import PlayerManager from './PlayerManager';
import MultiplayerRoom from './Room/MultiplayerRoom';

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

    switch (playerType) {
      case PlayerType.human:
        {
          const player = new HumanPlayer(playerOpts);
          this.playerManager.addPlayer(player);
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
          const playerGameStatus = room.getPlayerGameStatus(player);
          socket
            .to(room.roomName)
            .emit(COMPETITOR_JOINED_ROOM, playerGameStatus);
        }
        break;
      case PlayerType.bot: {
        const player = new LinearBotPlayer(playerOpts);
        this.playerManager.addPlayer(player);
        room.addPlayer(player);
        const playerGameStatus = room.getPlayerGameStatus(player);
        emitToRoom(room.roomName, COMPETITOR_JOINED_ROOM, playerGameStatus);
        break;
      }
      default:
        throw new Error(`${playerType} is not handled!`);
        break;
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

  removePlayer(player: BasePlayer): MultiplayerRoom | null {
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
