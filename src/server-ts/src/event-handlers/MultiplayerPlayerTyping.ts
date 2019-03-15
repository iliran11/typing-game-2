import * as io from 'socket.io';
import RoomManager from '../models/MultiplayerRoomManager';
import PlayerManager from '../models/PlayerManager';
import { typingDb } from '../mongoIndex';
import { HumanPlayer } from 'src/models/Player/HumanPlayer';
const playerManager = PlayerManager.getInstance();

export function MultiplayerPlayerTyping(socket: io.Socket, data) {
  const { typingInput } = data;
  const sfdfd = socket;
  const player = playerManager.getPlayer(socket);
  const roomManager = RoomManager.getInstance();
  const room = roomManager.getRoomById(player.roomId);
  const challengeLetter = player.playerGame.currentChallengeLetter;
  const game = player.playerGame.processNewTyping(typingInput);
  if (player instanceof HumanPlayer) {
    if (player.isAuthenticated) {
      typingDb.save({
        typedLetter: typingInput,
        playerId: player.playerId,
        gameId: room.instanceId,
        gameTimeStamp: Date.now() - room.roomStartTimestamp,
        challengeLetter,
        roomType: room.roomType
      });
    }
  } else {
    throw new Error(
      'non-human got into a function that accepts sockets. probably a bot.s'
    );
  }
}
