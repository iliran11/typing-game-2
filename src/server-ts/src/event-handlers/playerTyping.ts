import * as io from "socket.io";
import PlayerManager from "../classes/PlayerManager";

const playerManager = PlayerManager.getInstance();

export default function playerTyping(socket: io.Socket, data) {
  const { typingInput } = data;
  const player = playerManager.getPlayer(socket);
  // const room = roomManager.getRoom(player.roomId);
  const game = player.playerGame.processNewTyping(typingInput);
}
