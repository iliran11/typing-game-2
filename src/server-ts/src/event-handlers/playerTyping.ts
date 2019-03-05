import * as io from 'socket.io';
import PlayerManager from '../classes/PlayerManager';
import { typingDb } from '../mongoIndex';
import RoomManager from '../classes/MultiplayerRoomManager';
import { RoomType } from '../../../types';
import { typingTestManager } from '../classes/TypingTestManager';
const playerManager = PlayerManager.getInstance();
import { MultiplayerPlayerTyping } from './MultiplayerPlayerTyping';

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
