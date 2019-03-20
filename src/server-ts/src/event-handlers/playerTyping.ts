import * as io from 'socket.io';
import { RoomType } from '../../../types';
import PlayerManager from '../models/PlayerManager';
import { typingTestManager } from '../models/TypingTestManager';
import { MultiplayerPlayerTyping } from './MultiplayerPlayerTyping';
import { typingDb } from '../mongoIndex';
const playerManager = PlayerManager.getInstance();

export default function playerTyping(socket: io.Socket, data) {
  const { typingInput } = data;
  if (data.roomType === RoomType.MULTIPLAYER) {
    MultiplayerPlayerTyping(socket, data);
  }
  if (data.roomType === RoomType.TYPING_TEST) {
    try {
      const room = typingTestManager.getRoom(socket);
      const player = room.player;
      const challengeLetter = player.playerGame.currentChallengeLetter;
      room.player.playerGame.processNewTyping(data.typingInput);
      if (player.isAuthenticated) {
        typingDb.save({
          typedLetter: typingInput,
          playerId: player.playerId,
          gameId: room.instanceId,
          gameTimeStamp: Date.now() - room.roomStartTimestamp,
          challengeLetter,
          roomType: room.roomType,
          deviceType: player.deviceType
        });
      }
    } catch (e) {
      // do nothing. it means the player kept typing some time after the game was closed on server.
    }
  }
}
