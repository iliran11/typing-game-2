import * as io from 'socket.io';
import Player from '../classes/Player';
import PlayerManager from '../classes/PlayerManager';
import RoomManager from '../classes/RoomManager';
import Room from '../classes/Room';
import * as constants from '../../../constants';
import { emitToRoom } from '../utilities';
const playerManager = PlayerManager.getInstance();
const { COMPETITOR_JOINED_ROOM, YOU_JOINED_ROOM } = constants;
import { JoiningRoomResponse,RoomType } from '../../../types';
import { Socket } from 'dgram';

function allocatePlayerToRoom(socket: io.Socket) {
  const player = playerManager.getPlayer(socket);
  const room = RoomManager.getInstance().addPlayer(player);
  // if (room.isGameActive) {
  //   startGame(room);
  // }
  return room;
}

function sendPlayerRoomInfo(
  socket: io.Socket,
  room: Room,
  player: Player,
  roomType:RoomType
) {
  socket.join(room.roomName);
  const response: JoiningRoomResponse = {
    roomId: room.roomId,
    players: room.playersInRoom,
    letters: player.playerGame.getRawLetters,
    roomSize: room.maxPlayersInRoom,
    isGameActive: room.isGameActive,
    myId:player.playerId,
    roomType
  };
  socket.emit(YOU_JOINED_ROOM, response);
  broadcastCompetitorToRoom(player, room, socket);
}

function broadcastCompetitorToRoom(player: Player, room: Room, socket) {
  if (socket) {
    socket.to(room.roomName).emit(COMPETITOR_JOINED_ROOM, player.serializable);
  } else {
    emitToRoom(room.roomName, COMPETITOR_JOINED_ROOM, player.serializable);
  }
}

export function allocateHumanToRoom(socket:io.Socket,player:Player,roomType:RoomType) {
  const room = allocatePlayerToRoom(socket);
  sendPlayerRoomInfo(socket, room, player,roomType);
  if (room.isGameActive) {
    room.startGame();
  }
}

export function allocateBotToRoom(socket:string,player:Player,room:Room) {
  allocatePlayerToRoom(socket);
  broadcastCompetitorToRoom(player, room, null);
}
