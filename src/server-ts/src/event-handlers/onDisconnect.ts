import * as io from 'socket.io';
import { COMPETITOR_LEFT } from '../../../constants';
import { RoomType } from '../../../types/typesIndex';
import RoomManager from '../models/MultiplayerRoomManager';
import PlayerManager from '../models/PlayerManager';
import { logger, RoomPersonChange } from '../middlewares/Logger';
import { emitToRoom } from '../utilities';
import { userGameHistoryDb } from '../mongoIndex';

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
      userGameHistoryDb.save(room.getPlayerGameStatus(player));
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
