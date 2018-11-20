import * as io from 'socket.io';
import RoomManager from '../classes/RoomManager';
import PlayerManager from '../classes/PlayerManager';
import Player from '../classes/Player';
import onDisconnect from './onDisconnect';
import { allocateHumanToRoom } from './allocatePlayerToRoom';
import playerTyping from './playerTyping';
import onGameFinished from '../event-handlers/onGameFinished';
import onGameRestart from '../event-handlers/onGameRestart';
import {
  PLAYER_TYPING,
  CONNECT_SERVER_SUCCESS,
  GAME_HAS_FINISHED,
  RESTART_GAME,
  REQUEST_JOIN_ROOM
} from '../../../constants';
import { RoomType } from '../../../types';

const roomManager = RoomManager.getInstance();
const playerManager = PlayerManager.getInstance();

export default function onConnect(socket: io.Socket): void {
  // console.log(`connect- ${socket.client.id}`);
  const player = new Player(socket);
  socket.emit(CONNECT_SERVER_SUCCESS);
  socket.on(REQUEST_JOIN_ROOM, (roomType) => {
    if (roomType ===RoomType.public) {
      playerManager.addPlayer(player);
      allocateHumanToRoom(socket, player,roomType);
    }
  });
  socket.on('disconnect', () => {
    onDisconnect(socket);
  });
  socket.on(PLAYER_TYPING, data => {
    playerTyping(socket, data);
  });
  socket.on(GAME_HAS_FINISHED, () => {
    onGameFinished(socket);
  });
  socket.on(RESTART_GAME, () => {
    onGameRestart(socket);
  });
}
