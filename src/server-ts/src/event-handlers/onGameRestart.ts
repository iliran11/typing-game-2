import PlayerManager from '../classes/PlayerManager'
import RoomManager from '../classes/RoomManager'
import {allocateHumanToRoom} from '../event-handlers/allocatePlayerToRoom'
import * as io from "socket.io";


export default function onGameFinished(socket: io.Socket) {
  const playerManager = PlayerManager.getInstance();
  const roomManager = RoomManager.getInstance();
  const player = playerManager.getPlayer(socket);
  const room  = roomManager.getRoom(player.getRoomId);
  socket.leave(room.roomName);
  roomManager.removePlayer(player);
  allocateHumanToRoom(socket,player);
}