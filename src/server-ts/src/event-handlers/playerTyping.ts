import * as io from 'socket.io';
import { RoomType } from '../../../types';
import PlayerManager from '../models/PlayerManager';
import { typingTestManager } from '../models/TypingTestManager';
import { MultiplayerPlayerTyping } from './MultiplayerPlayerTyping';
const playerManager = PlayerManager.getInstance();

export default function playerTyping(socket: io.Socket, data) {
  if (data.roomType === RoomType.MULTIPLAYER) {
    MultiplayerPlayerTyping(socket, data);
  }
  if (data.roomType === RoomType.TYPING_TEST) {
    try {
      const room = typingTestManager.getRoom(socket);
      room.player.playerGame.processNewTyping(data.typingInput);
    } catch (e) {
      // do nothing. it means the player kept typing some time after the game was closed on server.
    }
  }
}
