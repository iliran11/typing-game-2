import * as io from 'socket.io';
import PlayerManager from '../classes/PlayerManager';
import RoomManager from '../classes/RoomManager';
import { COMPETITOR_HAS_FINISHED } from '../../../constants';
import { getServer } from '../utilities';
export default function onGameFinished(socket: io.Socket) {
  const playerManager = PlayerManager.getInstance();
  const roomManager = RoomManager.getInstance();
  // TODO: generlize the process of getting player from socket - in server event-handlers.
  const player = playerManager.getPlayer(socket);
  const roomId = player.getRoomId;
  const room = roomManager.getRoom(roomId);
  // @ts-ignore
  room.playerHasFinished(player);
  getServer()
    .in(room.roomName)
    .emit(COMPETITOR_HAS_FINISHED, player.serializable);
}
