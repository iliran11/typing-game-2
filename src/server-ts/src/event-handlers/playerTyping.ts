import * as io from 'socket.io';
import PlayerManager from '../classes/PlayerManager';
import { typingDb } from '../mongoIndex';
import RoomManager from '../classes/RoomManager';
const playerManager = PlayerManager.getInstance();

export default function playerTyping(socket: io.Socket, data) {
  const { typingInput } = data;
  const player = playerManager.getPlayer(socket);
  const roomManager = RoomManager.getInstance();
  const room = roomManager.getRoom(player.getRoomId);
  const challengeLetter = player.playerGame.currentChallengeLetter;
  const game = player.playerGame.processNewTyping(typingInput);
  if (player.isAuthenticated) {
    typingDb.save({
      typedLetter: typingInput,
      playerId: player.playerId,
      gameId: room.roomInstanceId,
      gameTimeStamp: Date.now() - room.roomStartTimestamp,
      challengeLetter,
      roomType: room.roomType
    });
  }
}
