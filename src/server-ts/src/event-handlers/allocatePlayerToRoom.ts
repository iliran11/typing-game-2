import * as io from 'socket.io';
import Player from '../classes/Player';
import PlayerManager from '../classes/PlayerManager';
import RoomManager from '../classes/RoomManager';
import * as constants from '../../../constants';
import ServerManager from '../classes/ServerManager';
const playerManager = PlayerManager.getInstance();
const roomManager = RoomManager.getInstance();
const { COMPETITOR_JOINED_ROOM, YOU_JOINED_ROOM } = constants;
import { JoiningRoomResponse } from '../../../types';

export default function allocatePlayerToRoom(socket: io.Socket) {
  const player = playerManager.getPlayer(socket);
  const room = roomManager.addPlayer(player);
  if (room.isGameActive) {
    getServer()
      .in(room.roomName)
      .emit(constants.GAME_HAS_STARTED);
    console.log(`${this.roomName}-Game started.`);
  }

  socket.join(room.roomName);
  const response: JoiningRoomResponse = {
    roomId: room.roomId,
    players: room.playersInRoom,
    letters: player.playerGame.getRawLetters,
    roomSize: room.maxPlayersInRoom,
    isGameActive: room.isGameActive
  };
  socket.emit(YOU_JOINED_ROOM, response);
  socket.to(room.roomName).emit(COMPETITOR_JOINED_ROOM, player.serializable);
}

function getServer() {
  return ServerManager.getInstance().serverObject;
}