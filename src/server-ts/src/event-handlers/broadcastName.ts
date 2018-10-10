import * as io from "socket.io";
import Player from "../classes/Player";
import PlayerManager from "../classes/PlayerManager";
import RoomManager from "../classes/RoomManager";
import sharedCode from "../../../client-server-code/client-server-code";
const {
  constants: { YOU_JOINED_ROOM, COMPETITOR_JOINED_GAME }
} = sharedCode;
const playerManager = PlayerManager.getInstance();
const roomManager = RoomManager.getInstance();

export default function broadcastName(socket: io.Socket, playerName: string) {
  const player = playerManager.getPlayer(socket);
  player.setName(playerName);
  roomManager.addPlayer(player);
  const room = roomManager.getRoom(player.roomId);
  socket.join(room.roomName);
  socket.emit(YOU_JOINED_ROOM, {
    gameId: player.roomId,
    players: room.playersInRoom,
    words: player.gameWords
  });
  socket.to(room.roomName).emit(COMPETITOR_JOINED_GAME, player.serializable);
}
