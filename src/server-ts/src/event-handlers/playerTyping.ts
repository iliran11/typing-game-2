import * as io from "socket.io";
import RoomManager from '../classes/RoomManager'
import PlayerManager from '../classes/PlayerManager'

const roomManager = RoomManager.getInstance()
const playerManager = PlayerManager.getInstance();

export default function playerTyping(socket: io.Socket, data) {
  const { newTypedWord: clientTypedString } = data;
  const player = playerManager.getPlayer(socket);
  // const room = roomManager.getRoom(player.roomId);
  const game = player.playerGame.gameObject
}
