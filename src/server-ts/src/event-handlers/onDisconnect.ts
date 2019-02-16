import * as io from 'socket.io';
import RoomManager from '../classes/MultiplayerRoomManager';
import PlayerManager from '../classes/PlayerManager';
import Room from '../classes/Room/MultiplayerRoom';
import { MAX_PLAYERS_PER_ROOM, COMPETITOR_LEFT } from '../../../constants';
import { emitToRoom } from '../utilities';

const playerManager = PlayerManager.getInstance();
const roomManager = RoomManager.getInstance();

export default function onDisconnect(socket: io.Socket): void {
  return;
  const player = playerManager.getPlayer(socket);
  playerManager.deletePlayer(socket);
  // @ts-ignore
  const room: Room = roomManager.removePlayer(player);
  console.log(
    `${player.playerId} disconnected ${room.roomId}. Capacity:${
      room.playersInRoom.length
    }/${MAX_PLAYERS_PER_ROOM}`
  );
  emitToRoom(room.roomName, COMPETITOR_LEFT, player.serializable);
}
