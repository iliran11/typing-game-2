import * as io from "socket.io";
import sharedCode from '../../../client-server-code/client-server-code'
import RoomManager from '../classes/RoomManager'
import PlayerManager from '../classes/PlayerManager'

const roomManager = RoomManager.getInstance()
const playerManager = PlayerManager.getInstance();
const {updateWordNextStatus} = sharedCode

export default function playerTyping(socket: io.Socket, data) {
  const { newTypedWord: clientTypedString } = data;
  const player = playerManager.getPlayer(socket);
  // const room = roomManager.getRoom(player.roomId);
  const game = player.playerGame.gameObject
  const { index, newTypedWord } = updateWordNextStatus(clientTypedString, game);
  game.words[index].typed = newTypedWord;
  game.index = index;
}
