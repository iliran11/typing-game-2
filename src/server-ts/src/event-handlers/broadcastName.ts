import * as io from "socket.io";
import Player from "../classes/Player";
import PlayerManager from "../classes/PlayerManager";
import RoomManager from "../classes/RoomManager";
import * as constants from "../../../constants";
const playerManager = PlayerManager.getInstance();
const roomManager = RoomManager.getInstance();
const { COMPETITOR_JOINED_ROOM, YOU_JOINED_ROOM } = constants;
import { JoiningRoomResponse } from "../../../types";

export default function allocatePlayerToRoom(socket: io.Socket) {
  const player = playerManager.getPlayer(socket);
  roomManager.addPlayer(player);
  const room = roomManager.getRoom(player.roomId);

  socket.join(room.roomName);
  console.log(`${player.playerId} Joined ${room.roomName}`)
  const response: JoiningRoomResponse = {
    roomId: player.roomId,
    players: room.playersInRoom,
    words: player.gameWords
  };
  socket.emit(YOU_JOINED_ROOM, response);
  socket.to(room.roomName).emit(COMPETITOR_JOINED_ROOM, player.serializable);
}
