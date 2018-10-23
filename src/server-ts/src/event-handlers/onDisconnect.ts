import * as io from "socket.io";
import RoomManager from "../classes/RoomManager";
import PlayerManager from "../classes/PlayerManager";
import Room from '../classes/Room'
import {MAX_PLAYERS_PER_ROOM} from '../../../constants'
import Player from "../classes/Player";
import { join } from "path";

const playerManager = PlayerManager.getInstance();
const roomManager = RoomManager.getInstance();

export default function onDisconnect(socket: io.Socket): void {
  const player = playerManager.getPlayer(socket);
  playerManager.deletePlayer(socket);
  const room: Room = roomManager.removePlayer(player);
  console.log(`${player.playerId} disconnected ${room.roomId}. Capacity:${room.playersInRoom.length}/${MAX_PLAYERS_PER_ROOM}`)
  // console.log(`disconnected - ${socket.client.id}`)
}
