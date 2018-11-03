import * as io from 'socket.io';
import Player from '../classes/Player';
import PlayerManager from '../classes/PlayerManager';
import RoomManager from '../classes/RoomManager';
import Room from '../classes/Room';
import * as constants from '../../../constants';
import ServerManager from '../classes/ServerManager';
const playerManager = PlayerManager.getInstance();
const { COMPETITOR_JOINED_ROOM, YOU_JOINED_ROOM } = constants;
import { JoiningRoomResponse } from '../../../types';

export function allocatePlayerToRoom(socket: io.Socket) {
  const player = playerManager.getPlayer(socket);
  const room = RoomManager.getInstance().addPlayer(player);
  if (room.isGameActive) {
    getServer()
      .in(room.roomName)
      .emit(constants.GAME_HAS_STARTED);
    console.log(`${this.roomName}-Game started.`);
  }
  return room;
}
export function sendPlayerRoomInfo(
  socket: io.Socket,
  room: Room,
  player: Player
) {
  socket.join(room.roomName);
  const response: JoiningRoomResponse = {
    roomId: room.roomId,
    players: room.playersInRoom,
    letters: player.playerGame.getRawLetters,
    roomSize: room.maxPlayersInRoom,
    isGameActive: room.isGameActive
  };
  socket.emit(YOU_JOINED_ROOM, response);
  broadcastCompetitorToRoom(player, room, socket);
}

export function broadcastCompetitorToRoom(player: Player, room: Room, socket) {
  if (socket) {
    socket.to(room.roomName).emit(COMPETITOR_JOINED_ROOM, player.serializable);
  } else {
    getServer()
      .to(room.roomName)
      .emit(COMPETITOR_JOINED_ROOM, player.serializable);
  }
}

function getServer() {
  return ServerManager.getInstance().serverObject;
}
