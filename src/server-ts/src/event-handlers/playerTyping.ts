import * as io from 'socket.io';
import PlayerManager from '../classes/PlayerManager';
import { createTypingRecord } from '../mongo/Typing/TypingModel';
import roomManager from '../classes/RoomManager';
import RoomManager from '../classes/RoomManager';
const playerManager = PlayerManager.getInstance();

export default function playerTyping(socket: io.Socket, data) {
  const { typingInput } = data;
  const player = playerManager.getPlayer(socket);
  const roomManager = RoomManager.getInstance();
  const room = roomManager.getRoom(player.getRoomId);
  const game = player.playerGame.processNewTyping(typingInput);
  if (player.isAuthenticated) {
    createTypingRecord({
      typedLetter: typingInput,
      playerId: player.playerId,
      gameId: room.roomInstanceId,
      gameTimeStamp: Date.now() - room.roomStartTimestamp
    }).save();
  }
}
