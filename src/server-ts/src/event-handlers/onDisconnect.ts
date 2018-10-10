import * as io from "socket.io";
import RoomManager from "../classes/RoomManager";
import PlayerManager from "../classes/PlayerManager";
import Player from "../classes/Player";
import { join } from "path";

const playerManager = PlayerManager.getInstance();
const roomManager = RoomManager.getInstance();

export default function onDisconnect(socket: io.Socket): void {
  const player = playerManager.getPlayer(socket);
  playerManager.deletePlayer(socket);
  roomManager.removePlayer(player);
  console.log(`disconnected - ${socket.client.id}`)
}
