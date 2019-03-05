import * as io from 'socket.io';
import RoomManager, {
  multiplayerRoomManager
} from '../classes/MultiplayerRoomManager';
import PlayerManager from '../classes/PlayerManager';
import MultiplayerRoom from '../classes/Room/MultiplayerRoom';
import { RoomType } from '../../../types/typesIndex';
import { MAX_PLAYERS_PER_ROOM, COMPETITOR_LEFT } from '../../../constants';
import { emitToRoom } from '../utilities';
import { RoomPersonChange, logger } from '../middlewares/Logger';

const playerManager = PlayerManager.getInstance();
const roomManager = RoomManager.getInstance();

export default function onDisconnect(socket: io.Socket): void {
  const player = playerManager.getPlayer(socket);
  if (!player) return;
  if (player.roomType === RoomType.MULTIPLAYER) {
    const room = roomManager.getRoomById(player.roomId);
    logger.logRoomPersonChange(
      room.instanceId,
      player.playerId,
      RoomPersonChange.DISCONNECTED
    );
    if (player.hasFinished === false) {
      player.hasLeft = true;
      if (room.isGameActive) {
        // TODO: add to BaseRoom a check if there are humans left in the game.
        room.finishedPlayersCountIncrement();
        emitToRoom(room.roomName, COMPETITOR_LEFT, player.serializable);
        console.log(`${player.playerId} disconnected ${room.instanceId}`);
      } else {
        room.removePlayer(player);
      }
    }
  }
  if (player.roomType === RoomType.TYPING_TEST) {
    logger.logRoomPersonChange(
      player.room.instanceId,
      player.playerId,
      RoomPersonChange.DISCONNECTED
    );
  }
  playerManager.deletePlayer(socket);
}
